import React, { useState } from 'react';

import './LoginForm.css';
import request from '../../helpers/request';
import { useStoreContext } from '../../store/StoreProvider';

const LoginForm = () => {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });

   const { email, password } = formData;
   const { setJwtToken } = useStoreContext();
   const [isError, setIsError] = useState(false);

   const handleChange = e => {
      const id = e.target.id;
      const value = e.target.value;
      setFormData({ ...formData, [id]: value });
   }

   const handleSubmit = async e => {
      e.preventDefault();

      if (email && password) {
         const { data, status } = await request.post(
            '/users/login',
            formData
         );

         if (status === 200) {
            setJwtToken(`${data.token}`);
            return;
         }
      }
      setIsError(true);
   }

   return (
      <form className="login-form" onSubmit={handleSubmit} noValidate>
         <label htmlFor="email">Email</label>
         <input className={isError ? 'error' : ''} type="text" id="email" value={email} onChange={handleChange} />

         <label htmlFor="password">Password</label>
         <input className={isError ? 'error' : ''} type="password" id="password" value={password} onChange={handleChange} />

         <button className="submit">Login</button>
      </form>
   );
}

export default LoginForm;