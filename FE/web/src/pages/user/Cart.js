import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { CartContext } from "./CartContext"; // Update the path to CartContext accordingly
import "../../style/Cart.css"; // Update the path to the CSS file

const Cart = () => {
  const { cart, setCart, reservations, setReservations } =
    useContext(CartContext);
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationDate, setReservationDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const cartItemsRef = useRef(null); // Ref for the cart-items element

  useEffect(() => {
    const interval = setInterval(() => {
      setReservations(
        (prevReservations) =>
          prevReservations
            .map((reservation) => {
              const remainingTime = Math.max(
                0,
                new Date(reservation.date) - new Date()
              );
              return { ...reservation, remainingTime };
            })
            .filter((reservation) => reservation.remainingTime > 0) // Filter out expired reservations
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [setReservations]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (cartItemsRef.current) {
        // Move scroll left for upward scroll, right for downward scroll
        if (event.deltaY !== 0) {
          const scrollAmount = event.deltaY;
          cartItemsRef.current.scrollLeft -= scrollAmount; // Negative for upward scroll, positive for downward scroll
          event.preventDefault(); // Prevent the default scrolling behavior
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleReservation = () => {
    if (cart.length === 0) {
      setAlertMessage("장바구니에 물건을 추가해주세요.");
      setShowAlert(true);
      return;
    }
    setShowReservation(true);
  };

  const handleConfirmReservation = () => {
    if (reservationDate === "") {
      setAlertMessage("예약 날짜를 설정하세요.");
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

    Swal.fire({
      title: "요청이 접수되었습니다.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인",
    });
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
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <h2>장바구니</h2>
      <div className="cart-container">
        <div className="cart-content">
          {cart.length > 0 ? (
            <div className="cart-items" ref={cartItemsRef}>
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span onClick={() => handleShow(item)}>
                    {item.name} <br />
                    {item.quantity}개
                  </span>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(index)}
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
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
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
            className="cart-button cart-button-primary mb-2"
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

      {selectedItem && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent} 수량 조절</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>현재 선택된 수량: {quantity}개</p>
            <div className="quantity-controls">
              <Button variant="outline-primary" onClick={handleDecrease}>
                -
              </Button>
              <span>{quantity}</span>
              <Button variant="outline-primary" onClick={handleIncrease}>
                +
              </Button>
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
            <div className="reser-items">
              {cart.map((item, index) => (
                <div key={index} className="reser-item">
                  <span>
                    {item.name} - {item.quantity}개
                  </span>
                </div>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowReservation(false)}
            className="cart-button cart-button-danger"
          >
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmReservation}
            className="cart-button cart-button-primary"
          >
            예약 확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
