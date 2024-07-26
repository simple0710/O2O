import React from 'react';
import AdminNav from './AdminNav';
import Sidebar from './Sidebar';

const Statistics = () => {
  return (
    <div>
        <AdminNav />

      <div className="content-container">
          <Sidebar />
          <div className="content">
            <h3>물건 사용빈도 통계</h3>
            
          </div>
      </div>
    </div>
  );
};

export default Statistics;