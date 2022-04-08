import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './ModalAddAccount.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import request from '../../helpers/request';
import InputComponent from '../../subcomponents/InputComponent';

const ModalAddAccount = ({ onClose, setRefresh }) => {
   const [formData, setFormData] = useState({
      name: '',
      surname: '',
      email: '',
      password: ''
   })

   const { name, surname, email, password } = formData;
   const [errorList, setErrorList] = useState([]);

   const handleChange = e => {
      const id = e.target.id;
      const value = e.target.value;
      setFormData({ ...formData, [id]: value });
      setErrorList(errorList.filter(item => item !== id));
   }

   const formValidation = () => {
      let keys = []
      for (const [key, value] of Object.entries(formData)) {
         if (!value) {
            console.log(`${key}: ${value}`);
            keys.push(key);
         }
      }

      return keys;
   }

   const handleSubmit = async e => {
      e.preventDefault();
      const keys = formValidation();

      setErrorList(keys);

      if (keys) {
         const { status } = await request.post(
            '/accounts',
            formData
         );

         if (status === 201) {
            onClose()
            setRefresh(prev => !prev)
         }

         return
      }
   }

   return ReactDOM.createPortal(
      <div className='overlay-modal'>
         <div className='modal add-account'>
            <button className='close' onClick={onClose}>
               <FontAwesomeIcon icon={faX} />
            </button>
            <p className='title'>New account details</p>
            <form onSubmit={handleSubmit} noValidate>
               <InputComponent errorList={errorList} name={'name'} value={name} handleChange={handleChange} />
               <InputComponent errorList={errorList} name={'surname'} value={surname} handleChange={handleChange} />
               <InputComponent errorList={errorList} name={'email'} value={email} handleChange={handleChange} />
               <InputComponent errorList={errorList} name={'password'} value={password} handleChange={handleChange} />

               <button type='submit'>Add new account</button>
            </form>
         </div>
      </div>,
      document.getElementById('portal')
   )
}

export default ModalAddAccount