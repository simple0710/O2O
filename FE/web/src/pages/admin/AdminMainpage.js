import React from 'react';
import AdminLocker from './AdminLocker';
import '../../style/AdminMainpage.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';

function AdminMainpage() {

  return (
    <div>
      <AdminNav />

      <div className="content-container">
          <Sidebar />
          <div className="content">
            <div className="locker">
              <AdminLocker />
            </div>
          </div>
      </div>
    
    </div>
  );
}

export default AdminMainpage;
