import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';
import { getCurrentProducts } from '../api/brokenfind.js';
import { formatDateSimple } from '../util/dateUtil.js';

// 임시 유저 아이디
const userId = 7;

function ReturnList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([[]]);
  const [selectedRentIndex, setSelectedRentIndex] = useState(null);
  const [selectedRent, setSelectedRent] = useState(null); // 선택된 rent 상태 추가

  useEffect(() => {
    getBrokenValues();
  }, []);

  const reportItems = () => {
    if (selectedRent) {
      const reportedItems = selectedRent.map(item => ({ ...item })); // 선택된 rent의 items만 전달
      console.log('reportedItems:', reportedItems);
      navigate('/returnstatus', { state: { reportedItems } });
    } else {
      console.log('선택된 대여가 없습니다.');
    }
  };

  const getBrokenValues = async () => {
    const data = await getCurrentProducts(userId, 1, 5);
    if (data != null) {
      const rentsData = [];
      for (let rent of data.rents) {
        const productsData = [];
        for (let product of rent.products) {
          if (product.status[1].product_cnt === 0) continue;
          productsData.push({
            id: product.product_id,
            name: product.product_name,
            cnt: product.status[1].product_cnt,
            status: product.status[1].status_id,
            rent_id: rent.rent_id,
            date: rent.rent_dt,
            broken: 0,
            missing: 0,
            icon: "🕶",
            locker_id: product.locker_id,
          });
        }
        rentsData.push(productsData);
      }
      setItems(rentsData);
    }
  };

  const handleRentClick = (index) => {
    setItems(prevItems =>
      prevItems.map((rent, rInd) =>
        rInd === index
          ? rent
          : rent.map(item => ({ ...item, broken: 0, missing: 0 }))
      )
    );
    setSelectedRentIndex(index);
    setSelectedRent(items[index]); // 선택된 rent를 상태로 저장
    const selectedRent = items[index];
    if (selectedRent.length > 0) {
      console.log("선택된 대여 일시:", formatDateSimple(selectedRent[0].date));
    }
  };

  return (
    <div className='frame-container'>
      <div className="cart-container">
        <h2>대여물품조회</h2>
        <div className="items">
          {items.map((rent, rInd) => (
            <div key={rInd} className="rent">
              <div>
                <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
              </div>
              {rent.map((item, pInd) => (
                <div
                  key={`${rInd}.${pInd}`}
                  className={`item ${selectedRentIndex === rInd ? 'selected-rent' : ''}`}
                  onClick={() => handleRentClick(rInd)}
                >
                  <div className="item-header">
                    <span className="item-icon">{item.icon}</span>
                    <span>
                      <p className="item-name">{item.name}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="report-button" onClick={reportItems}>반납하기</button>
      </div>
    </div>
  );
}

export default ReturnList;




////////////////// 밑에는 수량 선택 가능한 대여 리스트 조회 ////////////////////////

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/BrokenFind.css';
// import { getCurrentProducts } from '../api/brokenfind.js';
// import { formatDateSimple } from '../util/dateUtil.js';
// import IncreaseDecreaseButton from '../components/common/IncreaseDecreaseButton.js'

// // 임시 유저 아이디
// const userId = 7;

// function BrokenFind() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([[]]);
//   const [selectedRentIndex, setSelectedRentIndex] = useState(null);

//   useEffect(() => {
//     getBrokenValues();
//   }, []);

//   const reportItems = () => {
//     const reportedItems = [];
//     items.forEach(rent =>
//       rent.forEach(item => {
//         if (item.missing > 0 || item.broken > 0) {
//           reportedItems.push(item);
//         }
//       })
//     );
//     navigate('/returnstatus', { state: { reportedItems } });
//   };

//   const getBrokenValues = async () => {
//     const data = await getCurrentProducts(userId, 1, 5);
//     if (data != null) {
//       const rentsData = [];
//       for (let rent of data.rents) {
//         const productsData = [];
//         for (let product of rent.products) {
//           if (product.status[1].product_cnt === 0) continue;
//           productsData.push({
//             id: product.product_id,
//             name: product.product_name,
//             cnt: product.status[1].product_cnt,
//             status: product.status[1].status_id,
//             rent_id: rent.rent_id,
//             date: rent.rent_dt,
//             broken: 0,
//             missing: 0,
//             icon: "🕶",
//             locker_id: product.locker_id,
//           });
//         }
//         rentsData.push(productsData);
//       }
//       setItems(rentsData);
//     }
//   };

//   const handleRentClick = (index) => {
//     setItems(prevItems =>
//       prevItems.map((rent, rInd) =>
//         rInd === index
//           ? rent
//           : rent.map(item => ({ ...item, broken: 0, missing: 0 }))
//       )
//     );
//     setSelectedRentIndex(index);
//     const selectedRent = items[index];
//     if (selectedRent.length > 0) {
//       console.log("선택된 대여 일시:", formatDateSimple(selectedRent));
//     }
//   };

//   const increaseQuantity = (rentIndex, productIndex, type) => {
//     setItems(prevItems =>
//       prevItems.map((rent, rInd) =>
//         rInd === rentIndex
//           ? rent.map((item, pInd) =>
//             pInd === productIndex
//               ? {
//                 ...item,
//                 [type]:
//                   item.cnt - (item.broken + item.missing) === 0
//                     ? item[type]
//                     : item[type] + 1
//               }
//               : item
//           )
//           : rent
//       )
//     );
//   };

//   const decreaseQuantity = (rentIndex, productIndex, type) => {
//     setItems(prevItems =>
//       prevItems.map((rent, rInd) =>
//         rInd === rentIndex
//           ? rent.map((item, pInd) =>
//             pInd === productIndex
//               ? { ...item, [type]: Math.max(item[type] - 1, 0) }
//               : item
//           )
//           : rent
//       )
//     );
//   };

//   return (
//     <div className='frame-container'>
//       <div className="cart-container">
//         <h2>대여물품조회</h2>
//         <div className="items">
//           {items.map((rent, rInd) => (
//             <div key={rInd} className="rent">
//               <div>
//                 <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
//               </div>
//               {rent.map((item, pInd) => (
//                 <div
//                   key={`${rInd}.${pInd}`}
//                   className={`item ${selectedRentIndex === rInd ? 'selected-rent' : ''}`}
//                   onClick={() => handleRentClick(rInd)}
//                 >
//                   <div className="item-header">
//                     <span className="item-icon">{item.icon}</span>
//                     <span>
//                       <p className="item-name">{item.name}</p>
//                     </span>
//                   </div>

//                   <div className="item-controls">
//                     <div className="control">
//                       <span className="preserve-horizontal-text extreme-small-font">반납</span>
//                       <IncreaseDecreaseButton
//                         increaseQuantity={increaseQuantity}
//                         decreaseQuantity={decreaseQuantity}
//                         count={item.missing}
//                         rIndex={rInd}
//                         pIndex={pInd}
//                         type='missing'
//                       />
//                     </div>
//                   </div>

//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//         <button className="report-button" onClick={reportItems}>신고하기</button>
//       </div>
//     </div>
//   );
// }

// export default BrokenFind;
