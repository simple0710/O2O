import React from 'react';
// import '../../style/AdminMainpage.css'; 
import Sidebar from './Sidebar';
import Nav from './Nav';

function Profile() {

  return (
    <div>
      <Nav />
      <div className="content-container">
          <Sidebar />
          <div className="content">
            <h2>프로필</h2>
          </div>
      </div>
    
    </div>
  );
}

export default Profile;
