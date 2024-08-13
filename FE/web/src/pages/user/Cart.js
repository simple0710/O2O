import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { CartContext } from "./CartContext"; 
import { postReservation } from "../../api/userpost"; 
import "../../style/Cart.css"; 
import ButtonComponent from "../../components/ButtonComponent"; 

const Cart = () => {
  const { cart, setCart, lockerBodyId, setLockerBodyId } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationHour, setReservationHour] = useState("00");
  const [reservationMinute, setReservationMinute] = useState("00");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const cartItemsRef = useRef(null); // cart-items 요소를 위한 ref
  const user_id = localStorage.getItem('userId');

  useEffect(() => {
    // 페이지 초기 로드 시 장바구니를 로컬 스토리지에서 불러오기
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    // 로컬 스토리지에서 lockerBodyId 불러오기
    const savedLockerBodyId = localStorage.getItem("lockerBodyId");
    if (savedLockerBodyId) {
      setLockerBodyId(savedLockerBodyId);
    }
  }, []);

  useEffect(() => {
    // 장바구니가 변경될 때 로컬 스토리지에 저장
    localStorage.setItem("cart", JSON.stringify(cart));

    // 장바구니가 비어있으면 lockerBodyId를 초기화
    if (cart.length === 0) {
      setLockerBodyId(null);
      localStorage.removeItem("lockerBodyId");
    }
  }, [cart]);

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
        if (event.deltaY !== 0) {
          const scrollAmount = event.deltaY;
          cartItemsRef.current.scrollLeft -= scrollAmount;
          event.preventDefault();
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

  const handleConfirmReservation = async () => {
    if (reservationDate === "" || reservationHour === "" || reservationMinute === "") {
      setAlertMessage("예약 날짜와 시간을 모두 설정하세요.");
      setShowAlert(true);
      return;
    }

    const locker_body_id = lockerBodyId || cart[0]?.location?.locker_body_id;

    if (!locker_body_id) {
      setAlertMessage("사물함 ID를 찾을 수 없습니다.");
      setShowAlert(true);
      return;
    }

    const reserves = cart.map((item) => ({
      locker_id: item.locker_id,
      product_id: item.product_id,
      product_cnt: item.quantity,
    }));

    // 날짜와 시간 형식화
    const formattedTime = `${reservationHour}:${reservationMinute}`;
    const formattedDate = `${reservationDate} ${formattedTime}`;
    const reservationData = {
      user_id,
      locker_body_id,
      reserves,
      reserve_time: formattedDate,
    };

    console.log("Sending reservation data:", reservationData);

    try {
      await postReservation(reservationData);
      setCart([]); // 장바구니 비우기
      setShowReservation(false);

      console.log("Reservation successful");

      Swal.fire({
        title: "요청이 접수되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.error("Reservation failed:", error);
      setAlertMessage("예약 요청에 실패했습니다.");
      setShowAlert(true);
    }
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

  useEffect(() => {
    console.log('Cart contents:', cart);
  }, [cart]);

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

  // 시간 옵션 생성 (00시부터 23시까지)
  const hoursOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  // 분 옵션 생성 (0분, 30분)
  const minutesOptions = ["00", "30"];

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
          <ButtonComponent onClick={handleReservation}>
            예약하기
          </ButtonComponent>
          <ButtonComponent onClick={handleCancel}>
            취소
          </ButtonComponent>
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
          <Modal.Title style={{ textAlign: 'center', width: '100%' }}>예약 시간 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="formReservationDate">
    <Form.Label>예약 날짜</Form.Label>
    <Form.Control
      type="date"
      value={reservationDate}
      onChange={(e) => setReservationDate(e.target.value)}
      style={{marginBottom:'20px'}}
    />
  </Form.Group>
  <div className="d-flex align-items-center">
    <Form.Group controlId="formReservationHour" className="mr-2 flex-item">
      <Form.Label>시간</Form.Label>
      <Form.Control
        as="select"
        value={reservationHour}
        onChange={(e) => setReservationHour(e.target.value)}
      >
        {hoursOptions.map((hour) => (
          <option key={hour} value={hour}>
            {hour}시
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="formReservationMinute" className="flex-item">
      <Form.Label>분</Form.Label>
      <Form.Control
        as="select"
        value={reservationMinute}
        onChange={(e) => setReservationMinute(e.target.value)}
      >
        {minutesOptions.map((minute) => (
          <option key={minute} value={minute}>
            {minute}분
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </div>
</Form>

          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <ButtonComponent
            variant="primary"
            onClick={handleConfirmReservation}
            className="cart-button cart-button-primary"
          >
            예약 확인
          </ButtonComponent>
          <ButtonComponent
            variant="secondary"
            onClick={() => setShowReservation(false)}
            className="cart-button cart-button-danger"
          >
            취소
          </ButtonComponent>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
