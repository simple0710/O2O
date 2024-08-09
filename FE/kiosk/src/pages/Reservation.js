import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css'; // 동일한 스타일을 사용
import { formatDateSimple } from '../util/dateUtil.js';
import { getUserFromLocal } from '../util/localStorageUtil.js'; // 로컬 스토리지에서 사용자 정보를 가져오기 위한 함수

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservationIndex, setSelectedReservationIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const user = getUserFromLocal();
      if (!user || !user.user_id) {
        throw new Error('로그인된 사용자가 없거나 사용자 정보가 없습니다.');
      }

      const response = await axios.get('/kiosk/reserve/view/body', {
        params: {
          pg_no: 1,  // 페이지 번호
          per_page: 10,  // 페이지 당 항목 수
          userId: user.user_id,  // 사용자 ID
          bodyId: 1  // 예시로 하드코딩된 보관함 ID, 필요에 따라 수정하세요.
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
    setSelectedReservationIndex(index);
    const selectedReservation = reservations[index];
    if (selectedReservation) {
      console.log("선택된 예약 일시:", formatDateSimple(selectedReservation.reserve_dt));
    }
  };

  return (
    <div className="frame-container">
      <div className="cart-container">
        <h2>예약 내역 조회</h2>
        <div className="items">
          {reservations.length > 0 ? (
            reservations.map((reservation, rInd) => (
              <div key={rInd} className="rent">
                <div>
                  <p className="item-date small-font">예약 일시: {formatDateSimple(reservation.reserve_dt)}</p>
                  <p className="item-date small-font">만료 일시: {formatDateSimple(reservation.due_dt)}</p>
                </div>
                {reservation.products.map((product, pInd) => (
                  <div
                    key={`${rInd}.${pInd}`}
                    className={`item ${selectedReservationIndex === rInd ? 'selected-rent' : ''}`}
                    onClick={() => handleReservationClick(rInd)}
                  >
                    <div className="item-header">
                      <span className="item-icon">📦</span>
                      <span>
                        <p className="item-name">{product.product_name}</p>
                        <p className="item-small-font">수량: {product.product_cnt}</p>
                        <p className="item-small-font">위치: {product.locker_loc} ({product.locker_body})</p>
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
      </div>
    </div>
  );
}

export default Reservation;
