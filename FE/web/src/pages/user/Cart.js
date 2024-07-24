import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col, Container } from 'react-bootstrap';
import { CartContext } from './CartContext'; // CartContext 경로를 수정하세요.
import '../../style/Cart.css'; // 기존 CSS 파일 경로

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
                    .filter(reservation => reservation.remainingTime > 0) // Filter out expired reservations
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
        setCart([]); // Clear the cart
        setShowReservation(false);
    };

    const handleCancel = () => {
        setCart([]); // Clear the cart
    };

    const handleShow = (item) => {
        setSelectedItem(item);
        setQuantity(item.quantity); // Set quantity to current quantity
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
                            <Button variant="primary" onClick={handleReservation} className="cart-button cart-button-primary mb-2">
                                예약하기
                            </Button>
                            <Button variant="danger" onClick={handleCancel} className="cart-button cart-button-danger">
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
}

export default Cart;
