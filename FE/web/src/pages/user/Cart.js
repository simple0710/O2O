import React, { useState, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { CartContext } from "./CartContext";
import "../../style/Cart.css";

const Cart = () => {
  const { cart, setCart, reservations, setReservations } = useContext(CartContext);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleReservation = () => {
    if (cart.length === 0) {
      setAlertMessage("장바구니에 물건을 추가해주세요.");
      setShowAlert(true);
      return;
    }
    setShowReservation(true);
  };

  const handleConfirmReservation = () => {
    if (reservationDate === "" || reservationTime === "") {
      setAlertMessage("예약 날짜와 시간을 설정하세요.");
      setShowAlert(true);
      return;
    }

    // 예약 시간과 날짜를 조합하여 fullDate로 변환
    const fullDate = `${reservationDate}T${reservationTime}`;

    // 예약 정보 추가
    const newReservation = {
      date: fullDate,
      items: cart,
    };

    setReservations([...reservations, newReservation]);
    setCart([]); // 예약 후 장바구니 초기화
    setShowReservation(false);
  };

  const handleCancel = () => {
    setCart([]);
  };

  return (
    <>
      <h2 className="cart-title"></h2>
      <div className="cart-container">
        <div className="cart-content">
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>
                    {item.name} <br />
                    {item.quantity}개
                  </span>
                  <button
                    className="remove-button"
                    onClick={() => setCart(cart.filter((_, i) => i !== index))}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p>장바구니가 비어 있습니다.</p>
              {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  {alertMessage}
                </Alert>
              )}
            </>
          )}
        </div>
        <div className="cart-buttons">
          <Button
            variant="primary"
            onClick={handleReservation}
            className="cart-button cart-button-primary"
          >
            예약하기
          </Button>
          <Button
            variant="danger"
            onClick={handleCancel}
            className="cart-button cart-button-danger"
          >
            취소
          </Button>
        </div>
      </div>

      <Modal show={showReservation} onHide={() => setShowReservation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>예약 날짜 및 시간 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>예약 날짜</Form.Label>
              <Form.Control
                type="date"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>예약 시간</Form.Label>
              <Form.Control
                type="time"
                value={reservationTime}
                onChange={(e) => setReservationTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReservation(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleConfirmReservation}>
            예약 확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
