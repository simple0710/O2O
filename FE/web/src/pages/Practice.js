import React, { useState, useContext, useEffect, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { Container, Row, Col, Modal, Button, Form, Alert, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Profile from '../images/profile.png';
import '../style/Practice.css';

// CartContext.js
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Locker.js
const Locker = () => {
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [warning, setWarning] = useState('');
    const { cart, setCart } = useContext(CartContext);

    const handleCloseWithoutAddToCart = () => {
        setShow(false);
    };

    const handleAddToCart = () => {
        if (quantity > 0 && selectedItem) {
            const existingItemIndex = cart.findIndex(item => item.name === modalContent);
            const existingQuantity = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
            const totalQuantity = existingQuantity + quantity;

            if (totalQuantity > selectedItem.quantity) {
                Swal.fire({
                    title: "재고가 부족합니다.",
                    text: "장바구니에 물품이 있는지 확인해주세요.",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "확인",
                });
                setShow(false);
            } else {
                const itemDetails = { name: modalContent, quantity };

                if (existingItemIndex >= 0) {
                    const updatedCart = cart.map((item, index) =>
                        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
                    );
                    setCart(updatedCart);
                } else {
                    setCart(prevCart => [...prevCart, itemDetails]);
                }
                setShow(false);
            }
        } else {
            setWarning('수량을 선택해주세요.');
        }
    };

    const handleShow = (item) => {
        setSelectedItem(item);
        setQuantity(0);
        setModalContent(item.name);
        setWarning('');
        setShow(true);
    };

    const tableData = [
        [
            { name: "가위", quantity: 4 },
            { name: "풀", quantity: 5 },
            { name: "잉크", quantity: 5 }
        ],
        [
            { name: "종이", quantity: 5 },
            { name: "핸드크림", quantity: 5 },
            { name: "이어폰", quantity: 5 }
        ],
        [
            { name: "주스", quantity: 5 },
            { name: "핸드폰", quantity: 5 },
            { name: "과자", quantity: 5 }
        ]
    ];

    const handleIncrease = () => {
        if (quantity < selectedItem.quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
            setWarning('');
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className="outer-box">
            <p>사물함</p>
            <table className="responsive-table">
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} onClick={() => handleShow(cell)}>
                                    {cell.name} ({cell.quantity}개)
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedItem && (
                <Modal
                    show={show}
                    onHide={handleCloseWithoutAddToCart}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent} 예약하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>현재 선택된 수량: {quantity}개</p>
                        <div className="quantity-controls">
                            <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
                            <span>{quantity}</span>
                            <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
                        </div>
                        {warning && <p className="text-danger">{warning}</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddToCart}>
                            담기
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

// Cart.js
const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [showReservation, setShowReservation] = useState(false);
    const [reservationDate, setReservationDate] = useState('');
    const [reservations, setReservations] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setReservations(prevReservations =>
                prevReservations
                    .map(reservation => {
                        const remainingTime = Math.max(0, new Date(reservation.date) - new Date());
                        return { ...reservation, remainingTime };
                    })
                    .filter(reservation => reservation.remainingTime > 0)
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const handleReservation = () => {
        if (cart.length === 0) {
            setAlertMessage('장바구니에 물건이 없습니다.');
            setShowAlert(true);
            return;
        }
        setShowReservation(true);
    };

    const handleConfirmReservation = () => {
        if (reservationDate === '') {
            setAlertMessage('예약 날짜를 설정하세요.');
            setShowAlert(true);
            return;
        }
        const newReservation = {
            date: reservationDate,
            items: cart,
            remainingTime: new Date(reservationDate) - new Date(),
        };
        setReservations([...reservations, newReservation]);
        setCart([]);
        setShowReservation(false);
    };

    const handleCancel = () => {
        setCart([]);
    };

    const handleShow = (item) => {
        setSelectedItem(item);
        setQuantity(item.quantity);
        setModalContent(item.name);
        setShow(true);
    };

    const handleClose = () => {
        if (selectedItem) {
            const updatedCart = cart.map((item) =>
                item.name === selectedItem.name ? { ...item, quantity } : item
            );
            setCart(updatedCart);
        }
        setShow(false);
    };

    const handleRemoveItem = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const formatRemainingTime = (remainingTime) => {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days}일 ${hours}시간`;
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} className="left-banner">
                    <h2>예약 물품</h2>
                    {reservations.length > 0 ? (
                        reservations.map((reservation, index) => (
                            <div key={index} className="mb-3 p-2 border rounded bg-light">
                                <p>예약 날짜: {new Date(reservation.date).toLocaleString()}</p>
                                <p>남은 시간: {formatRemainingTime(reservation.remainingTime)}</p>
                                {reservation.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="d-flex justify-content-between align-items-center border p-2 rounded mb-1 bg-white">
                                        <span>{item.name} - {item.quantity}개</span>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>예약된 물품이 없습니다.</p>
                    )}
                </Col>
                <Col md={9} className="main-content">
                    <h2>장바구니</h2>
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            {alertMessage}
                        </Alert>
                    )}
                    <div className="cart-container">
                        <div className="cart-content">
                            {cart.length > 0 ? (
                                <div className="cart-items">
                                    {cart.map((item, index) => (
                                        <div key={index} className="cart-item">
                                            <span onClick={() => handleShow(item)}>
                                                {item.name} <br />
                                                {item.quantity}개
                                            </span>
                                            <button className="remove-button" onClick={() => handleRemoveItem(index)}>x</button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>장바구니가 비어 있습니다.</p>
                            )}
                        </div>
                        <div className="cart-buttons">
                            <Button 
                            onClick={handleReservation} 
                            className="cart-button cart-button-primary mb-2"
                            style={{backgroundColor:'black', color:'white'}}
                            >
                                예약하기
                            </Button>
                            <Button 
                            onClick={handleCancel} 
                            className="cart-button cart-button-danger"
                            >
                                취소
                            </Button>
                        </div>
                    </div>

                    {selectedItem && (
                        <Modal
                            show={show}
                            onHide={handleClose}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{modalContent} 수량 조절</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>현재 선택된 수량: {quantity}개</p>
                                <div className="quantity-controls">
                                    <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
                                    <span>{quantity}</span>
                                    <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    확인
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}

                    <Modal
                        show={showReservation}
                        onHide={() => setShowReservation(false)}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>예약 시간 설정</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="reservationDate">
                                    <Form.Label>예약 날짜</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={reservationDate}
                                        onChange={(e) => setReservationDate(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="cart-items">
                                    {cart.map((item, index) => (
                                        <div key={index} className="cart-item">
                                            <span>{item.name} - {item.quantity}개</span>
                                        </div>
                                    ))}
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowReservation(false)} className="cart-button cart-button-danger">
                                취소
                            </Button>
                            <Button variant="primary" onClick={handleConfirmReservation} className="cart-button cart-button-primary">
                                예약 확인
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

// Modals.js
const Modals = ({ show, handleClose }) => {
    return (
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
    );
};

// MainPage.js
const MainPage = () => {
    const { cart, setCart } = useContext(CartContext);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const notRefund = [
        { name: "가위", quantity: 4 },
        { name: "풀", quantity: 5 },
    ];

    const register = [
        { name: "풀", quantity: 5 },
        { name: "잉크", quantity: 5 }
    ];

    const recent = [
        { name: "가위", quantity: 4 },
        { name: "잉크", quantity: 5 }
    ];

    const addToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        const existingQuantity = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
        const totalQuantity = existingQuantity + item.quantity;

        if (totalQuantity > item.quantity) {
            Swal.fire({
                title: "재고가 부족합니다.",
                text: "장바구니에 물품이 있는지 확인해주세요.",
                icon: "warning",
                confirmButtonColor: "#3085d6",
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
                    <hr />
                    <div>
                        예약 물품
                        <ul>
                            {register.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div>
                        최근 대여 물품
                        <ul>
                            {recent.map((item, index) => (
                                <li key={index}>{item.name} {item.quantity}개 <button className='btn' onClick={() => addToCart(item)}>담기</button></li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                </div>
                <div className="content">
                    <div className="locker">
                        <Locker />
                    </div>
                    <div className="cart">
                        <Cart />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Combine everything into App.js
const Prac = () => {
    return (
        <CartProvider>
            <MainPage />
        </CartProvider>
    );
};

export default Prac;
