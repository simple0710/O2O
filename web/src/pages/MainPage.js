import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import '../MainPageApp.css'; 
import { Link } from 'react-router-dom';

function MainPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar-custom">
        <Button variant="primary" onClick={handleShow}>
          요청
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>물품 요청하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            물품명
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              확인
            </Button>
            <Button variant="primary" onClick={handleClose}>
              취소
            </Button>
          </Modal.Footer>
        </Modal>

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
            사진 홍길동 님
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">프로필정보</Dropdown.Item>
            <Dropdown.Item as={Link} to="/login">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      <div className="content-container">
          <div className="left-section">
            <div className="one">
              미반납 물품
              <ul>
                <li>가위</li>
                <li>풀</li>
              </ul>
            </div>
            <div className="two">
              예약 물품
              <ul>
                <li>가위</li>
                <li>풀</li>
              </ul>
            </div>
            <div className="three">
              최근 대여 물품
              <ul>
                <li>가위</li>
                <li>풀</li>
              </ul>
            </div>
          </div>
          <div className="right-section">
            <div className="top-right">
              <div className="outer-box">
                박스내부
              </div>
            </div>
            <div className="bottom-right">
              <div className="outer-box">
                박스내부
              </div>
            </div>
          </div>
      </div>
    
    </div>
  );
}

export default MainPage;
