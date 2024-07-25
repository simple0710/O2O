import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Pagination } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import '../../style/Complain.css';

const Request = () => {
  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h3>연체 이용자 리스트 관리</h3>

        </div>
      </div>
    </div>
  );
};

export default Request;
