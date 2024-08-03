import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Dropdown } from 'react-bootstrap';
import '../../style/AdminMainpage.css'; 
import '../../style/AdminLocker.css'; 
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';


const AdminNav = () => {
  return (
    <div>
      <nav className="navbar-custom">
        <Nav className="navbar-left">
          <Nav.Link href="/admin">O<span className="highlight">2</span>O</Nav.Link>
        </Nav>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
          <img src={Profile} alt="프로필사진" style={{ width: '40px' }} />
            admin 님
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/admin/changepwd">프로필 수정</Dropdown.Item>
            <Dropdown.Item as={Link} to="/logout">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </div>
  );
};

export default AdminNav;
