import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Dropdown, Form } from 'react-bootstrap';
import '../MainPageApp.css'; 
import { Link, useNavigate } from 'react-router-dom';
import '../Changepwd.css'; 
import Profile from '../images/profile.png';

function ChangePwd() {
  const navigate = useNavigate();

  const handlePasswordChange = () => {
      if (window.confirm('비밀번호가 변경되었습니다.')) {
          navigate('/login'); 
      }
  };

  return (
    <div>
      <nav className="navbar-custom">
        <Nav className="navbar-left">
          <Nav.Link href="/mainpage">O<span className="highlight">2</span>O</Nav.Link>
        </Nav>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
          <img src={Profile} alt="프로필사진" style={{ width: '40px' }} />
            홍길동 님
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">프로필정보</Dropdown.Item>
            <Dropdown.Item as={Link} to="/login">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      <div className="content-container">
          <div className="side-bar">
            <div>
              미반납 물품
              <ul>
                <li>가위</li>
                <li>풀</li>
              </ul>
            </div>
            <hr></hr>
            <div>
              예약 물품
              <ul>
                <li>가위</li>
                <li>풀</li>
              </ul>
            </div>
            <hr></hr>
            <div>
              최근 대여 물품
              <ul>
                <li>가위</li>
                <li>풀</li>
              </ul>
            </div>
            <hr></hr>
          </div>
          <div className="content">
            <h1>비밀 번호 변경</h1>
            <div className="pwd-form">
                <Form.Label htmlFor="inputPassword">기존 비밀번호 입력</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword"
                    placeholder="현재 비밀번호를 입력해 주세요."
                />
                <Form.Label htmlFor="inputNewPassword1">새 비밀번호 입력</Form.Label>
                <Form.Control
                    type="password"
                    id="inputNewPassword1"
                    placeholder="새 비밀번호를 입력해주세요."
                />
                <Form.Label htmlFor="inputNewPassword2">새 비밀번호 확인</Form.Label>
                <Form.Control
                    type="password"
                    id="inputNewPassword2"
                    placeholder="새 비밀번호를 다시 입력해주세요."
                />
                <Button variant="dark" 
                  className="pwd-button" 
                  onClick={handlePasswordChange}
                >
                  비밀번호 수정
                </Button>
            </div>

          </div>
      </div>
    
    </div>
  );
}

export default ChangePwd;
