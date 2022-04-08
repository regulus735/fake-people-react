import React, { useEffect, useState, createContext, useContext } from 'react';
import request from '../helpers/request';

export const StoreContext = createContext(null);

export const useStoreContext = () => useContext(StoreContext)

const StoreProvider = ({ children }) => {
   const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'))

   const checkJwtToken = async () => {
      const { status } = await request.get('/users/auth');
      if (status === 401)
         localStorage.removeItem('jwtToken');
   }

   const logOut = async () => {
      localStorage.removeItem('jwtToken');
      setJwtToken(null);
      await request.post('/users/logout');
   }

   useEffect(() => {
      if (jwtToken)
         localStorage.setItem('jwtToken', jwtToken)
      else
         setJwtToken(localStorage.getItem('jwtToken'))

      checkJwtToken()
   }, [jwtToken])


   return (
      <StoreContext.Provider value={{
         jwtToken,
         setJwtToken,
         logOut
      }}>
         {children}
      </StoreContext.Provider>
   )
}

export default StoreProvider