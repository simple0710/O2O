import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ReservationModal.css';
import { formatDateSimple } from '../util/dateUtil.js';
import { getUserFromSession } from '../util/sessionUtils.js';

function ReservationModal({ show, handleClose, onProceedToCart }) {
  const [reservations, setReservations] = useState([]);
  const [selectedReservationIndex, setSelectedReservationIndex] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (show) {
      fetchReservations();
    }
  }, [show]);

  const fetchReservations = async () => {
    try {
      const user = getUserFromSession();
      if (!user || !user.user_id) {
        throw new Error('로그인된 사용자가 없거나 사용자 정보가 없습니다.');
      }

      const response = await axios.get('/kiosk/reserve/view/body', {
        params: {
          pg_no: 1,
          per_page: 10,
          userId: user.user_id,
          bodyId: 1 
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 200) {
        setReservations(response.data.data.reserves);
      } else {
        console.error('예약 내역을 불러오는 데 실패했습니다:', response.data.message);
      }
    } catch (error) {
      console.error('오류 발생:', error.message);
    }
  };

  const handleReservationClick = (index) => {
    if (selectedReservationIndex === index) {
      setSelectedReservationIndex(null);
      setCartItems([]);
    } else {
      setSelectedReservationIndex(index);
      const selectedReservation = reservations[index];
      if (selectedReservation) {
        console.log("선택된 예약 일시:", formatDateSimple(selectedReservation.reserve_dt));

        const newItems = selectedReservation.products.map(product => ({
          id: product.product_id,
          name: product.product_name,
          quantity: product.product_cnt,
          locker_id: product.locker_id,
          locker_loc: product.locker_loc,
          locker_body: product.locker_body
        }));

        setCartItems(newItems);
      }
    }
  };

  const proceedToCart = () => {
    onProceedToCart(cartItems);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header className="reservation-modal-header" closeButton>
        <Modal.Title className="reservation-modal-title">예약 내역 조회</Modal.Title>
      </Modal.Header>
      <Modal.Body className="reservation-modal-body">
        <div className="reservation-items">
          {reservations.length > 0 ? (
            reservations.map((reservation, rInd) => (
              <div key={rInd} className="reservation-rent">
                <div>
                  <p className="reservation-item-date reservation-item-small-font">예약 일시 : {formatDateSimple(reservation.reserve_dt)}</p><br></br>
                  <p className="reservation-item-date reservation-item-small-font">만료 일시 : {formatDateSimple(reservation.due_dt)}</p>
                </div>
                {reservation.products.map((product, pInd) => (
                  <div
                    key={`${rInd}.${pInd}`}
                    className={`reservation-item ${selectedReservationIndex === rInd ? 'reservation-selected-rent' : ''}`}
                    onClick={() => handleReservationClick(rInd)}
                  >
                    <div className="reservation-item-header">
                      <span className="reservation-item-icon">📦</span>
                      <span>
                        <p className="reservation-item-name">{product.product_name}</p>
                        <p className="reservation-item-small-font">수량 : {product.product_cnt}</p>
                        <br></br>
                        <p className="reservation-item-small-font">위치 : {product.locker_loc} ({product.locker_body})</p>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>예약 내역이 없습니다.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="reservation-modal-footer">
        <Button className="reservation-btn-secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button className="reservation-btn-primary" onClick={proceedToCart}>
          카트로 이동
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReservationModal;
