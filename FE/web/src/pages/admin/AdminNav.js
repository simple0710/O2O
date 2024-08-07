import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Dropdown } from 'react-bootstrap';
import '../../style/AdminMainpage.css'; 
import '../../style/AdminLocker.css'; 
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import {Logout} from '../Logout'; 
import { getProfile } from '../../api/userget'; 


const AdminNav = () => {

  const handleLogout = async () => {
    await Logout();    
  };

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const profile = await getProfile(userId);
            setUserName(profile.user_nm);
        } catch (error) {
            console.log(error);
        }
    };

    fetchUserName();
}, []);


  return (
    <div>
      <nav className="navbar-custom">
        <Nav className="navbar-left">
          <Nav.Link href="/admin">O<span className="highlight">2</span>O</Nav.Link>
        </Nav>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
          <img src={Profile} alt="프로필사진" style={{ width: '40px' }} />
            {userName} 님
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/admin/changepwd">비밀번호 수정</Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/profile">프로필 수정</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </div>
  );
};

export default AdminNav;

