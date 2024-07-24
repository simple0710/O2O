import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Dropdown, Form } from 'react-bootstrap';
import '../../style/AdminMainpage.css'; 
import '../../style/AdminLocker.css'; 
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import AdminLocker from './AdminLocker';
import Sidebar from './Sidebar';

function AdminMainpage() {

  return (
    <div>
      <nav className="navbar-custom">
        <Nav className="navbar-left">
          <Nav.Link href="/mainpage">O<span className="highlight">2</span>O</Nav.Link>
        </Nav>

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
          <img src={Profile} alt="프로필사진" style={{ width: '40px' }} />
            admin 님
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/changepwd">프로필 수정</Dropdown.Item>
            <Dropdown.Item as={Link} to="/">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

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
