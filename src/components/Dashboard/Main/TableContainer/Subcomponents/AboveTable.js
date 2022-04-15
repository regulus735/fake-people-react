import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AboveTable.sass';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import request from '../../../../../helpers/request';
import ModalAddAccount from '../../../../Modal/ModalAddAccount';


const AboveTable = ({ items, setRefresh, page }) => {
   const [toggleDisable, setToggleDisable] = useState(false)
   const [isOpenModal, setIsOpenModal] = useState(false);

   useEffect(() => {
      setToggleDisable(items.every(item => !item.checked))
   }, [items])

   const handleDelete = async () => {
      const ids = items
         .filter(item => item.checked)
         .map(item => item._id)

      const { status } = await request.delete(
         '/accounts',
         { data: ids }
      );
      // if (status === 200)

      setRefresh(prev => !prev)
   }

   return (
      <div className='above-table'>
         <h1>Google accounts</h1>
         <button className='red' disabled={toggleDisable} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
            <h1>Delete selected</h1>
         </button>

         <button className='gray' onClick={() => setIsOpenModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
            <h1>Add new account</h1>
         </button>

         {isOpenModal && <ModalAddAccount onClose={() => setIsOpenModal(false)} setRefresh={setRefresh} />}
      </div>
   )
}

export default AboveTable