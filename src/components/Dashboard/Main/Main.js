import React from 'react';
import './Main.css';
import TableContainer from './TableContainer/TableContainer';

const Main = () => {

   return (
      <main className='dashboard-main'>
         <div className='page-title'>
            <h1>Dashboard</h1>
         </div>
         <TableContainer />
      </main>
   )
}

export default Main;