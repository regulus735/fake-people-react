import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import request from '../../../../../../helpers/request';
import InputComponent from './InputComponent';

const allowedUpdates = ['name', 'surname', 'email', 'password'];

const InputContainer = ({ item }) => {
   const [isEditMode, setIsEditMode] = useState(false);
   const [inputsData, setInputsData] = useState(
      Object.fromEntries(
         Object.entries(item).filter(([k, v]) => allowedUpdates.includes(k))
      )
   )

   const handleEdit = async () => {
      if (isEditMode) {
         const objects = Object.entries(inputsData).filter(([k, v]) => v === '' || v.length > 50)

         if (!isEmail(inputsData['email'])) {
            console.log('email czerwony')
            return
         }

         if (objects.length === 0) {
            console.log(item._id)
            const { data, status } = await request.patch(
               `/accounts/${item._id}`,
               inputsData
            );

            if (status === 200)
               setIsEditMode(false);
         }

         console.log(objects)
         return
      }

      setIsEditMode(prev => !prev);
   }

   const handleChange = e => {
      const name = e.target.name;
      const value = e.target.value;

      setInputsData({ ...inputsData, [name]: value });
   }

   return (
      <>
         <InputComponent key={'name'} name='name' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} />
         <InputComponent key={'surname'} name='surname' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} />
         <InputComponent key={'email'} name='email' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} />
         <InputComponent key={'password'} name='password' isEditMode={isEditMode} handleChange={handleChange} inputsData={inputsData} />
         <p>Coming soon</p>
         <button className='edit' onClick={handleEdit}>{isEditMode ? 'Save' : 'Edit'}</button>
      </>
   );
}

export default InputContainer;