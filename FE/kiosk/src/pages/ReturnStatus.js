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
  const [updatedReportedItems, setUpdatedReportedItems] = useState(reportedItems); // New state for updated reported items
  


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

        // Update the reportedItems with parsedData values
        const newUpdatedReportedItems = reportedItems.map(item => {
          if (parsedData[item.product_id]) {
            return { ...item, cnt: parseInt(parsedData[item.product_id], 10) };
          }
          return item;
        });

        setUpdatedReportedItems(newUpdatedReportedItems); // Update state with new reported items
        console.log("updatedReportedItems", updatedReportedItems)


      const computedReturnData = {
        rent_id: reportedItems[0]?.rent_id, // Assuming all items have the same rent_id
        products: updatedReportedItems
          .filter(item => parsedData[item.id]) // Filter only items that exist in parsedData
          .map(item => ({
            product_id: parseInt(item.id, 10),
            // product_cnt: item.cnt,
            product_cnt: parseInt(parsedData[item.id], 10),
            locker_id: item.locker_id,
            status_id: 2
          }))
      };

      setReturnData(computedReturnData); // Store computed returnData in state
      console.log('returnData: ', computedReturnData);

 


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


  // useEffect(() => {
  //   if (returnData.products && returnData.products.length === 0) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: '선택한 물품과 다릅니다.',
  //       text: '옳바른 물품을 올려주세요.',
  //       confirmButtonText: '확인',
  //       timer: 2000, // 2초
  //       timerProgressBar: true, 
  //     }).then(() => {
  //       navigate('/');
  //     });
  //   } 
  // }, [returnData, navigate]);


  useEffect(() => {
    if (returnData.products && returnData.products.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '선택한 물품과 다릅니다.',
        text: '올바른 물품을 올려주세요.',
        confirmButtonText: '확인',
        timer: 2000, // 2초
        timerProgressBar: true, 
      }).then(() => {
        navigate('/');
      });
    } else if (returnData.products && returnData.products.length > 0) {
      const isProductCntExceeding = returnData.products.some(returnItem => {
        const reportedItem = reportedItems.find(repItem => repItem.id === returnItem.product_id);
        return reportedItem && returnItem.product_cnt > reportedItem.cnt;
      });
  
      if (isProductCntExceeding) {
        Swal.fire({
          icon: 'warning',
          title: '수량 초과',
          text: '반납하려는 물품 수량이 등록된 수량보다 많습니다.',
          confirmButtonText: '확인',
          timer: 2000, // 2초
          timerProgressBar: true,
        }).then(() => {
          navigate('/');
        });
      }
    }
  }, [returnData, navigate]);
  


  const handleNavigate = () => {
    navigate('/returnlocker', { state: { returnData } });
  };

  console.log('returnData: ', returnData)


  const productList = returnData.products?.map(item => {
    const matchedItem = reportedItems.find(repItem => repItem.id === item.product_id);
    return {
      name: matchedItem ? matchedItem.name : 'Unknown Item',
      cnt: item.product_cnt,
    };
  }) || [];

  console.log('productList: ', productList)

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
        {loading ? <Loading /> : <ItemList productList={productList} />}
      </div>

      <Button onClick={handleNavigate} />
    </div>
  );
}

export default ReturnStatus;
