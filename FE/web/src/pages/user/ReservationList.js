import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import '../../style/RequestItme.css';
import { Table, Button, Form } from 'react-bootstrap';
import { getReservation } from '../../api/userget';
import Pagination from "../admin/Pagination";

const BorrowList = () => {
  const [reservations, setReservations] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservation(1, 10, 4); // 4는 유저 아이디로 바꿔야 함
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    if (reservations && reservations.reserves) {
      console.log(reservations.reserves); // 데이터 전체 로그 출력
    }
  }, [reservations]);

  const calculateRemainingTime = (dueDate) => {
    const due = new Date(dueDate);
    const timeDifference = due - currentTime;

    if (timeDifference <= 0) {
      return '만료됨';
    }

    const days = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days}일 남음`;
    } else {
      return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  let itemCount = 1;

  return (
    <div>
      <Nav />
      <div className="content-container">
        <Sidebar />
        <div className='content'>
          <div className='title'>
            <h3>예약 내역 조회</h3>
          </div>
          <Table className='custom-table'>
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>물품명</th>
                <th>예약 개수</th>
                <th>사물함 위치</th>
                <th>남은 기간</th>
              </tr>
            </thead>
            <tbody>
              {reservations.reserves && reservations.reserves.length > 0 ? (
                reservations.reserves
                  .filter(item => new Date(item.due_dt) > currentTime) // 필터링 조건
                  .map((item, index) => {
                    return item.products.map((product, productIndex) => (
                      <tr key={`${index}-${productIndex}`}>
                        <td>
                          {productIndex === 0 && (
                            <Form.Check
                              type="checkbox"
                              onChange={() => handleCheckboxChange(`${index}-${productIndex}`)}
                              checked={checkedItems[`${index}-${productIndex}`] || false}
                            />
                          )}
                        </td>
                        <td>{index + 1}</td>
                        <td>{product.product_name}</td>
                        <td>{product.product_cnt}</td>
                        <td>{product.locker_body}</td>
                        <td>{calculateRemainingTime(item.due_dt)}</td>
                      </tr>
                    ));
                  })
              ) : (
                <tr>
                  <td colSpan="6">예약 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="mt-3">
            <Button
              className="check-button"
              style={{ marginRight: "10px" }}
            >
              처리완료
            </Button>
          </div>

          <Pagination
            // currentPage={currentPage}
            // totalPages={totalPages}
            // handlePageChange={handlePageChange}
          />

        </div>
      </div>
    </div>
  );
};

export default BorrowList;
