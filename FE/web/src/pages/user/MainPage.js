import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import '../../style/MainPageApp.css'; 
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import Locker from './Locker';
import Cart from './Cart';
import Modals from './Modals';
import { CartProvider } from './CartContext';



function MainPage() {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <nav className="navbar-custom">
        <Nav className="navbar-left">
          <Nav.Link href="/mainpage">O<span className="highlight">2</span>O</Nav.Link>
        </Nav>
        <Button variant="danger" onClick={handleShow}>
          요청
        </Button>
        <Modals show={show} handleClose={handleClose} />
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
          <img src={Profile} alt="프로필사진" style={{ width: '40px' }} />
            홍길동 님
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/changepwd">프로필 수정</Dropdown.Item>
            <Dropdown.Item as={Link} to="/">로그아웃</Dropdown.Item>
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
                <li>가위 <button className='btn'>담기</button></li> 
                <li>풀 <button className='btn'>담기</button></li>
              </ul>
            </div>
            <hr></hr>
          </div>
          <div className="content">
            <CartProvider>
            <div className="locker">
              <Locker />
            </div>
            <div className="cart">
              <Cart />
            </div>
            </CartProvider>
          </div>
      </div>
    
    </div>
  );
}

export default MainPage;


