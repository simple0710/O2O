import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Dropdown, Form } from 'react-bootstrap';
import '../../style/AdminMainpage.css'; 
import '../../style/AdminLocker.css'; 
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import AdminLocker from './AdminLocker';

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
          <div className="side-bar">
          <Link to="/admin/request" className="side-bar-item">물건 요청 관리 페이지</Link>
          <Link to="/admin/complain" className="side-bar-item">파손, 분실 신고 관리</Link>
          <Link to="/admin/statics" className="side-bar-item">물건 사용빈도 통계</Link>
          <Link to="/admin/userlist" className="side-bar-item">연체 이용자 리스트</Link>
          </div>
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
