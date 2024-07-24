import React, {useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Dropdown, Modal, Form, Alert } from 'react-bootstrap';
import '../../style/MainPageApp.css'; 
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import Locker from './Locker';
import Cart from './Cart';
import Modals from './Modals';
import { CartProvider, CartContext } from './CartContext';
import Swal from 'sweetalert2'




function MainPage() {
  const { cart, setCart } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


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
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    const existingQuantity = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
    const totalQuantity = existingQuantity + item.quantity;

    if (totalQuantity > item.quantity) {
      Swal.fire({
        title: "재고가 부족합니다.",
        text: "장바구니에 물품이 있는지 확인해주세요.",
        icon: "warning",
        
        confirmButtonColor: "#3085d6", //빨간색
        confirmButtonText: "확인",
      });
    } else {
      if (existingItemIndex >= 0) {
        const updatedCart = cart.map((cartItem, index) =>
          index === existingItemIndex ? { ...cartItem, quantity: totalQuantity } : cartItem
        );
        setCart(updatedCart);
      } else {
        setCart(prevCart => [...prevCart, { ...item, quantity: totalQuantity }]);
      }
     
    }
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


