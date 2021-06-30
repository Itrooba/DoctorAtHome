import React from 'react';
import Topbar from '../Login/Topbar';
import Doctor from './Doctor';
import ViewOrders from './ViewOrders';

function Dashboard() {
    return (
        <div>
       <Topbar />
      <Doctor />
      <ViewOrders />
      </div>
    );
  }
  
      export default Dashboard;