import React, {useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import '../../style/MainPageApp.css'; 
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import Locker from './Locker';
import Cart from './Cart';
import { CartProvider, CartContext } from './CartContext';



function MainPage() {
  const navigate = useNavigate();
  const { setCart } = useContext(CartContext); // CartContext에서 setCart를 가져옵니다.



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notRefund = [
    { name: "가위", quantity: 4 },
    { name: "풀", quantity: 5 },
  ]

  const register = [
    { name: "풀", quantity: 5 },
    { name: "잉크", quantity: 5 }
  ]

  const recent = [
    { name: "가위", quantity: 4 },
    { name: "잉크", quantity: 5 }
  ]

  const addToCart = (item) => {
    console.log('Adding to cart: ', item)
    setCart((prevCart) => [...prevCart, item]);
  };


  return (
    <div>
      <nav className="navbar-custom">
        <Nav className="navbar-left">
          <Nav.Link href="/mainpage">O<span className="highlight">2</span>O</Nav.Link>
        </Nav>
        <Button variant="danger" onClick={handleShow}>
          요청
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>물품 요청하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>물품 명</Form.Label>
            <Form.Control placeholder="요청 물품 명을 적어주세요." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>신청 사유</Form.Label>
            <Form.Control placeholder="물품 신청 사유를 적어주세요." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>물품 링크</Form.Label>
            <Form.Control placeholder="물품 신청 사유를 적어주세요." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>물품 개수</Form.Label>
            <Form.Control placeholder="물건 개수를 입력해주세요.(숫자만 입력해주세요)" />
          </Form.Group>
            
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
                {notRefund.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
            <hr></hr>
            <div>
              예약 물품
              <ul>
              {register.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
            <hr></hr>
            <div>
              최근 대여 물품
              <ul>
              {recent.map((item, index) => (
                <li key={index}>{item.name} {item.quantity}개 <button className='btn' onClick={() => addToCart(item)}>담기</button></li>
              ))}
              </ul>
            </div>
            <hr></hr>
          </div>
          <div className="content">
            {/* <CartProvider> */}
            <div className="locker">
              <Locker />
            </div>
            <div className="cart">
              <Cart />
            </div>
            {/* </CartProvider> */}
          </div>
      </div>
    
    </div>
  );
}

export default MainPage;


