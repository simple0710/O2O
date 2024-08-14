// import React, { useState, useEffect } from 'react';
// import Sidebar from "./Sidebar";
// import Nav from './Nav';
// import '../../style/RequestItme.css';
// import { Table, Button, Form } from 'react-bootstrap';
// import { getReservation } from '../../api/userget'; 
// import { deleteReservation } from '../../api/userpost'; 
// import Pagination from "../admin/Pagination";

// const BorrowList = () => {
//   const [reservations, setReservations] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [checkedItems, setCheckedItems] = useState({});

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const fetchAllReservations = async () => {
//       let page = 1;
//       let allReservations = [];
//       let hasMoreData = true;

//       while (hasMoreData) {
//         try {
//           const data = await getReservation(page, 10, 4); // 4는 유저 아이디로 바꿔야 함
//           if (data.reserves && data.reserves.length > 0) {
//             allReservations = [...allReservations, ...data.reserves];
//             page++;
//           } else {
//             hasMoreData = false;
//           }
//           console.log('Data:' ,data)
//         } catch (error) {
//           console.error('Error fetching reservations:', error);
//           hasMoreData = false;
//         }
//       }

//       setReservations(prevState => ({
//         ...prevState,
//         reserves: allReservations
//       }));
//     };

//     fetchAllReservations();
//   }, []);

//   useEffect(() => {
//     if (reservations && reservations.reserves) {
//       console.log(reservations.reserves); // 데이터 전체 로그 출력
//     }
//   }, [reservations]);

//   const calculateRemainingTime = (dueDate) => {
//     const due = new Date(dueDate);
//     const timeDifference = due - currentTime;

//     if (timeDifference <= 0) {
//       return '만료됨';
//     }

//     const days = Math.floor(timeDifference / (1000 * 3600 * 24));
//     const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
//     const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
//     const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//     if (days > 0) {
//       return `${days}일 남음`;
//     } else {
//       return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
//     }
//   };

//   const handleCheckboxChange = (id, reserveId) => {
//     setCheckedItems(prevState => ({
//       ...prevState,
//       [id]: {
//         checked: !prevState[id]?.checked,
//         reserveId: reserveId
//       }
//     }));
//   };

//   const handleDelete = async () => {
//     const itemsToDelete = Object.values(checkedItems).filter(item => item.checked).map(item => item.reserveId);

//     for (let reserveId of itemsToDelete) {
//       try {
//         await deleteReservation(reserveId); // Send DELETE request
//         setReservations(prevState => ({
//           ...prevState,
//           reserves: prevState.reserves.filter(reserve => reserve.reserve_id !== reserveId)
//         }));
//       } catch (error) {
//         console.error('Error deleting reservation:', error);
//       }
//     }
//     setCheckedItems({});
//   };

//   return (
//     <div>
//       <Nav />
//       <div className="content-container">
//         <Sidebar />
//         <div className='content'>
//           <div className='title'>
//             <h3>예약 내역 조회</h3>
//           </div>
//           <Table className='custom-table'>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>No.</th>
//                 <th>물품명</th>
//                 <th>예약 개수</th>
//                 <th>사물함 위치</th>
//                 <th>남은 기간</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reservations.reserves && reservations.reserves.length > 0 ? (
//                 reservations.reserves
//                   .filter(item => new Date(item.due_dt) > currentTime) // 필터링 조건
//                   .map((item, index) => {
//                     return item.products.map((product, productIndex) => (
//                       <tr key={`${index}-${productIndex}`}>
//                         <td>
//                           {productIndex === 0 && (
//                             <Form.Check
//                               type="checkbox"
//                               onChange={() => handleCheckboxChange(`${index}-${productIndex}`, item.reserve_id)}
//                               checked={checkedItems[`${index}-${productIndex}`]?.checked || false}
//                             />
//                           )}
//                         </td>
//                         <td>{index + 1}</td>
//                         <td>{product.product_name}</td>
//                         <td>{product.product_cnt}</td>
//                         <td>{product.locker_body}</td>
//                         <td>{calculateRemainingTime(item.due_dt)}</td>
//                       </tr>
//                     ));
//                   })
//               ) : (
//                 <tr>
//                   <td colSpan="6">예약 내역이 없습니다.</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>

//           <div className="mt-3">
//             <Button
//               className="check-button"
//               style={{ marginRight: "10px" }}
//               onClick={handleDelete} // Add onClick handler
//             >
//               처리완료
//             </Button>
//           </div>

//           <Pagination
//             // currentPage={currentPage}
//             // totalPages={totalPages}
//             // handlePageChange={handlePageChange}
//           />

//         </div>
//       </div>
//     </div>
//   );
// };

// export default BorrowList;


import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import '../../style/RequestItme.css';
import { Table, Button, Form } from 'react-bootstrap';
import { getReservation } from '../../api/userget'; 
import { deleteReservation } from '../../api/userpost'; 
import Pagination from "../admin/Pagination";
import ButtonComponent from '../../components/ButtonComponent'; 
import { ScaleLoader } from 'react-spinners'; // 스피너 컴포넌트 임포트

const BorrowList = () => {
  const [reservations, setReservations] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAllReservations = async () => {
      let page = 1;
      let allReservations = [];
      let hasMoreData = true;

      while (hasMoreData) {
        try {
          const data = await getReservation(page, 10, userId); // 4는 유저 아이디로 바꿔야 함
          if (data.reserves && data.reserves.length > 0) {
            allReservations = [...allReservations, ...data.reserves];
            page++;
          } else {
            hasMoreData = false;
          }
          console.log('Data:', data);
        } catch (error) {
          console.error('Error fetching reservations:', error);
          hasMoreData = false;
        }
      }

      setReservations(allReservations);
      setIsLoading(false);
    };

    fetchAllReservations();
  }, []);

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

  const handleCheckboxChange = (id, reserveId) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: {
        checked: !prevState[id]?.checked,
        reserveId: reserveId
      }
    }));
  };

  const handleDelete = async () => {
    const itemsToDelete = Object.values(checkedItems).filter(item => item.checked).map(item => item.reserveId);

    for (let reserveId of itemsToDelete) {
      try {
        await deleteReservation(reserveId); // Send DELETE request
        setReservations(prevState => prevState.filter(reserve => reserve.reserve_id !== reserveId));
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
    setCheckedItems({});
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 데이터 잘라내기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = reservations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Nav />
      <div className="content-container">
        <Sidebar />
        <div className='content'>
          <div className='title'>
            <h3>예약 현황 조회</h3>
          </div>
          {isLoading ? (
            <div className='request-spinner'>
              <ScaleLoader color='gray' size={50} />
            </div>
          ) : (
            <>
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
              {currentReservations && currentReservations.length > 0 ? (
                currentReservations
                  .filter(item => new Date(item.due_dt) > currentTime) // 필터링 조건
                  .map((item, index) => {
                    return item.products.map((product, productIndex) => (
                      <tr key={`${index}-${productIndex}`}>
                        <td>
                          {productIndex === 0 && (
                            <Form.Check
                              type="checkbox"
                              onChange={() => handleCheckboxChange(`${index}-${productIndex}`, item.reserve_id)}
                              checked={checkedItems[`${index}-${productIndex}`]?.checked || false}
                            />
                          )}
                        </td>
                        <td>{indexOfFirstItem + index + 1}</td>
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
            <ButtonComponent
              onClick={handleDelete} 
            >
              처리완료
            </ButtonComponent>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(reservations.length / itemsPerPage)}
            handlePageChange={handlePageChange}
          />
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowList;
