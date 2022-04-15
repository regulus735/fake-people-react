import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

import { useStoreContext } from './store/StoreProvider';

function App() {
   const { jwtToken } = useStoreContext()

   const DashboardComponent = jwtToken ? <Dashboard /> : <Navigate to="/login" />
   const LoginComponent = jwtToken ? <Navigate to="/" /> : <Login />

   return (
      <Router basename={process.env.PUBLIC_URL}>
         <Routes>
            <Route path='/' element={DashboardComponent} />
            <Route path='/login' element={LoginComponent} />
            <Route path='*' element={<h1>404</h1>} />
         </Routes>
      </Router>
   );
}

export default App;
