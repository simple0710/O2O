// import React, { useEffect, useState } from 'react';
// import Instruction from '../components/returnstatus/Instruction';
// import ItemList from '../components/returnstatus/ItemList';
// import Button from '../components/returnstatus/Button';
// import '../styles/Identification/Identification.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { getTest } from '../api/cameraget.js';
// import { getUserIdFromSession } from '../util/sessionUtils.js';
// import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';
// import { Loading } from '../components/common/loading.js';
// import Swal from 'sweetalert2';

// function ReturnStatus() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { reportedItems } = location.state || [];
//   const [userId, setUserId] = useState(null);
//   const [lockerBodyId, setLockerBodyId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [parsedData, setParsedData] = useState(null);  // New state to store parsed data
  
//   const itemsMap = {
//     3: '마우스',
//     76: '가위',
//     // 다른 매핑 추가
//   };

//   useEffect(() => {
//     const id = getUserIdFromSession();
//     if (id) {
//       setUserId(id);
//     }

//     saveLockerBodyIdFromLocal();
//     const locker_body_id = getLockerBodyIdFromLocal();
//     setLockerBodyId(locker_body_id);
//   }, []);

//   const Test = async () => {
//     if (userId) {
//       setLoading(true);
//       try {
//         console.log('Test function called');
//         console.log('Before API call');
//         const data = await getTest();
//         console.log('After API call');
//         console.log("Test API data:", data.data.message);

//         const message = data.data.message;

//         let parsedData;
//         try {
//           parsedData = JSON.parse(message);
//           setParsedData(parsedData);  // Store parsed data in state
//         } catch (parseError) {
//           console.error('Error parsing message:', parseError);
//           return;
//         }

//         console.log('parsedData', parsedData);

//         const keys = Object.keys(parsedData);

//         keys.forEach(key => {
//           const matchingItem = reportedItems.find(item => item.product_id === parseInt(key, 10));

//           if (matchingItem) {
//             console.log(`Key: ${key} matches with reportedItem product_id: ${matchingItem.product_id}`);
            
//             const value = parsedData[key];
//             const productCount = matchingItem.product_cnt;

//             if (value === productCount) {
//               console.log(`Value: ${value} matches with product_cnt: ${productCount}`);
//             } else {
//               console.log(`Value: ${value} does not match with product_cnt: ${productCount}`);
//             }
//           } else {
//             console.log(`Key: ${key} does not match any reportedItem product_id`);
//           }
//         });

//       } catch (error) {
//         console.error("Error fetching test data:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       console.log('userId가 설정되지 않아 Test 함수 호출을 생략합니다.');
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       Test();
//       console.log('userId', userId);
//     }
//   }, [userId]);

//   useEffect(() => {
//     console.log('반납 선택 물품 :', reportedItems);
//   }, [reportedItems]);

//   // Construct returnData using parsedData from Test()
//   const returnData = reportedItems.reduce((acc, item) => {
//     if (!acc.rent_id) {
//       acc = {
//         rent_id: item.rent_id,
//         products: []
//       };
//     }

//     if (parsedData && parsedData[item.product_id]) {
//       acc.products.push({
//         product_id: parseInt(item.product_id, 10), // Use the original product_id
//         product_cnt: parseInt(parsedData[item.product_id], 10),  // Convert value to integer
//         locker_id: item.locker_id,
//         status_id: 2
//       });
//     }

//     return acc;
//   }, {});

//   useEffect(() => {
//     if (returnData.products.length === 0) {
//       Swal.fire({
//         icon: 'warning',
//         title: '경고',
//         text: '반납할 물품이 없습니다.',
//         confirmButtonText: '확인'
//       }).then(() => {
//         navigate('/');
//       });
//     }
//   }, [returnData.products, navigate]);

//   console.log('returnData: ', returnData);

//   const handleNavigate = () => {
//     navigate('/returnlocker', { state: { returnData } });
//   };

//   return (
//     <div className='identification-container'>
//       <button className="btn-main" onClick={() => navigate('/')}>
//         HOME
//       </button>
//       <div className="text-box">
//         {/* 로딩 상태에 따라 다른 텍스트 렌더링 */}
//         {loading ? (
//           <>
//             <p className='mb-0'>물건을 인식해 주세요.</p>
//             <p className='small-font'>지정된 위치에 물건을 놓아주세요.</p>
//           </>
//         ) : (
//           <>
//             <p className='mb-0'>물건 인식 결과입니다.</p>
//             <p className='small-font'>반납할 물품이 맞는지 확인해주세요.</p>
//           </>
//         )}
//       </div>

//       <div className="video-container">
//         {loading ? <Loading /> : <ItemList reportedItems={reportedItems} />}
//       </div>

//       <Button onClick={handleNavigate} onRetry={Test} />
//     </div>
//   );
// }

// export default ReturnStatus;




import React, { useEffect, useState } from 'react';
import Instruction from '../components/returnstatus/Instruction';
import ItemList from '../components/returnstatus/ItemList';
import Button from '../components/returnstatus/Button';
import '../styles/Identification/Identification.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTest } from '../api/cameraget.js';
import { getUserIdFromSession } from '../util/sessionUtils.js';
import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';
import { Loading } from '../components/common/loading.js';
import Swal from 'sweetalert2';

function ReturnStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const { reportedItems } = location.state || [];
  const [userId, setUserId] = useState(null);
  const [lockerBodyId, setLockerBodyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);  // New state to store parsed data
  const [returnData, setReturnData] = useState({}); // State to store returnData

  const itemsMap = {
    3: '마우스',
    76: '가위',
    // 다른 매핑 추가
  };

  useEffect(() => {
    const id = getUserIdFromSession();
    if (id) {
      setUserId(id);
    }

    saveLockerBodyIdFromLocal();
    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);
  }, []);

  const Test = async () => {
    if (userId) {
      setLoading(true);
      try {
        console.log('Test function called');
        console.log('Before API call');
        const data = await getTest();
        console.log('After API call');
        console.log("Test API data:", data.data.message);

        const message = data.data.message;

        let parsedData;
        try {
          parsedData = JSON.parse(message);
          setParsedData(parsedData);  // Store parsed data in state
        } catch (parseError) {
          console.error('Error parsing message:', parseError);
          return;
        }

        console.log('parsedData', parsedData);

        const keys = Object.keys(parsedData);

        // Create returnData based on parsedData and reportedItems
        const computedReturnData = reportedItems.reduce((acc, item) => {
          if (!acc.rent_id) {
            acc = {
              rent_id: item.rent_id,
              products: []
            };
          }

          if (parsedData && parsedData[item.product_id]) {
            acc.products.push({
              product_id: parseInt(item.product_id, 10), // Use the original product_id
              product_cnt: parseInt(parsedData[item.product_id], 10),  // Convert value to integer
              locker_id: item.locker_id,
              status_id: 2
            });
          }

          return acc;
        }, {});

        setReturnData(computedReturnData); // Store computed returnData in state

        // Check if returnData is empty and show Swal alert if necessary
        if (computedReturnData.products.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: '경고',
            text: '반납할 물품이 없습니다.',
            confirmButtonText: '확인',
			timer: 2000, // 3초
			timerProgressBar: true, 
          }).then(() => {
            navigate('/');
          });
        }

      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('userId가 설정되지 않아 Test 함수 호출을 생략합니다.');
    }
  };

  useEffect(() => {
    if (userId) {
      Test();
      console.log('userId', userId);
    }
  }, [userId]);

  useEffect(() => {
    console.log('반납 선택 물품 :', reportedItems);
  }, [reportedItems]);

  const handleNavigate = () => {
    navigate('/returnlocker', { state: { returnData } });
  };

  return (
    <div className='identification-container'>
      <button className="btn-main" onClick={() => navigate('/')}>
        HOME
      </button>
      <div className="text-box">
        {/* 로딩 상태에 따라 다른 텍스트 렌더링 */}
        {loading ? (
          <>
            <p className='mb-0'>물건을 인식해 주세요.</p>
            <p className='small-font'>지정된 위치에 물건을 놓아주세요.</p>
          </>
        ) : (
          <>
            <p className='mb-0'>물건 인식 결과입니다.</p>
            <p className='small-font'>반납할 물품이 맞는지 확인해주세요.</p>
          </>
        )}
      </div>

      <div className="video-container">
        {loading ? <Loading /> : <ItemList reportedItems={reportedItems} />}
      </div>

      <Button onClick={handleNavigate} />
    </div>
  );
}

export default ReturnStatus;
