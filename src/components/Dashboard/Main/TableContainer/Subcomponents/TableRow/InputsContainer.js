import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import request from '../../../../../../helpers/request';
import InputComponent from './InputComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const allowedUpdates = ['name', 'surname', 'email', 'password'];

const getValues = (item) => (
   Object.fromEntries(
      Object.entries(item).filter(([k, v]) => allowedUpdates.includes(k))
   )
)

const InputContainer = ({ item }) => {
   const [isEditMode, setIsEditMode] = useState(false);
   const [inputsData, setInputsData] = useState(getValues(item))

   const [errorList, setErrorList] = useState([]);

   const handleEdit = async () => {
      if (isEditMode) {
         let invalidInputs = []
         Object.entries(inputsData).forEach(([k, v]) => {
            if (v.length === 0 || v.length > 50)
               invalidInputs.push(k)
         })

         setErrorList(invalidInputs)

         if (!isEmail(inputsData['email'])) {
            setErrorList(prev => [...prev, 'email'])
            return
         }

         if (invalidInputs.length === 0) {
            console.log(item._id)
            const { status } = await request.patch(
               `/accounts/${item._id}`,
               inputsData
            );

            if (status === 200)
               setIsEditMode(false);

            return
         }
         return
      }

      setIsEditMode(prev => !prev);
   }

   const handleChange = e => {
      const name = e.target.name;
      const value = e.target.value;

      setInputsData({ ...inputsData, [name]: value });
   }

   const handleCancle = () => {
      setIsEditMode(false);
      setInputsData(getValues(item));
      setErrorList([])
   }

   return (
      <>
         <InputComponent key={'name'} name='name' label='Name' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} errorList={errorList} />
         <InputComponent key={'surname'} name='surname' label='Surname' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} errorList={errorList} />
         <InputComponent key={'email'} name='email' label='E-mail address' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} errorList={errorList} />
         <InputComponent key={'password'} name='password' label='Password' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} errorList={errorList} />
         <p className='coming' data-label='Coming soon'><span>Coming soon</span></p>
         <div className='edit-container'>
            {isEditMode && <button className='cancle' onClick={handleCancle}><FontAwesomeIcon icon={faXmark} /></button>}
            <button onClick={handleEdit}>{isEditMode ? 'Save' : 'Edit'}</button>
         </div>
      </>
   );
}

export default InputContainer;