import React from 'react';
import AsideMenu from './AsideNavigation/AsideNavigation';
import './Dashboard.css';
import Main from './Main/Main';

const Dashboard = () => {
   return (
      <div className="dashboard">
         <AsideMenu />
         <div className='wrapper'>
            <Main />
         </div>
      </div>
   );
}

export default Dashboard;