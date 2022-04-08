import React, { useEffect, useReducer, useState } from 'react';
import './TableContainer.css';

import AboveTable from './Subcomponents/AboveTable';
import TableRow from './Subcomponents/TableRow/TableRow';
import Pagination from './Subcomponents/Pagination';
import request from '../../../../helpers/request';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const TYPES = {
   HEADER: 'header',
   ROW: 'row'
}

export const ACTIONS = {
   ADD_ITEMS: 'add-items',
   TOGGLE_ITEM: 'toggle-item',
   TOGGLE_ALL: 'toggle-all',
   DELETE_ITEMS: 'delete-items'
}

const reducer = (items, { type, payload }) => {
   switch (type) {
      case ACTIONS.ADD_ITEMS:
         return payload.items;

      case ACTIONS.TOGGLE_ITEM:
         return items.map(item => {
            if (item._id === payload.id)
               return { ...item, checked: !item.checked }
            return item
         })

      case ACTIONS.TOGGLE_ALL:
         return items.map(item => (
            { ...item, checked: payload.checked }
         ))

      case ACTIONS.DELETE_ITEMS:
         return items.filter(item => payload.ids.includes(item._id))

      default:
         break;
   }
}

const TableContainer = () => {
   const [items, dispatch] = useReducer(reducer, [])

   const [paginationData, setPaginationData] = useState({});
   const [refresh, setRefresh] = useState(false)

   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const location = useLocation();

   const fetchData = async () => {
      const { data, status } = await request.get('/accounts', {
         params: {
            page: searchParams.get("page") ?? 1
         }
      });

      if (status === 200) {
         data.docs = data.docs.map(item => {
            item['checked'] = false
            return item
         })

         dispatch({ type: ACTIONS.ADD_ITEMS, payload: { items: data.docs } });

         setPaginationData(() => {
            delete data.docs
            return data
         });

         return new Promise((resolve) => resolve(data));
      }
      return new Promise((reject) => reject());
   }

   useEffect(() => {
      fetchData()
         .then(data => {
            if (data.page > data.totalPages) {
               navigate({
                  pathname: '/',
                  search: `?page=${data.totalPages}`
               })
            }
         })

   }, [refresh, location])

   const rows = items.map(item => <TableRow type={TYPES.ROW} key={item._id} item={item} dispatch={dispatch} />)

   const checkedAll = items.length && items.every(item => item.checked)

   return (
      <div className='table-container'>
         <AboveTable items={items} page={paginationData.page} setRefresh={setRefresh} />
         <div className='table'>
            <TableRow type={TYPES.HEADER} dispatch={dispatch} item={{ checkedAll }} />
            {rows}
         </div>
         <Pagination data={paginationData} />
      </div>
   )
}

export default TableContainer