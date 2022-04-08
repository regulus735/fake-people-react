import React from 'react';

import { ACTIONS, TYPES } from '../../TableContainer';
import InputContainer from './InputsContainer';

import './TableRow.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const headerComponent =
   <>
      <p>Name</p>
      <p>Surname</p>
      <p className='email'>E-mail address</p>
      <p>Password</p>
      <p>Coming soon</p>
      <button className='edit'></button>
   </>

const TableRow = ({ type, item, dispatch }) => {
   const checked = item?.checked ?? item.checkedAll

   const handleCheck = e => {
      if (type === TYPES.HEADER) {
         dispatch({ type: ACTIONS.TOGGLE_ALL, payload: { checked: e.target.checked } })
         return
      }

      dispatch({ type: ACTIONS.TOGGLE_ITEM, payload: { id: item._id } })
   };

   return (
      <div className={`row-element ${type} ${checked ? ' checked' : ''}`}>
         <label className="table-control">
            <input type="checkbox" name="checkbox" checked={checked} onChange={handleCheck} />
            <FontAwesomeIcon icon={faCheck} className='icon' />
         </label>

         {type === TYPES.HEADER ? headerComponent : <InputContainer key={item.name} item={item} />}
      </div>
   )
}

export default TableRow