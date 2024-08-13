import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {axiosSpring} from '../api/axios';
import '../styles/Locker.css';
import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';
import {open} from '../api/cameraget'


const ChangeLocker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [lockerBodyId, setLockerBodyId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    saveLockerBodyIdFromLocal();

    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);
  }, []);

  useEffect(() => {
    axiosSpring.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);

        if (lockerBodyId) {
          const defaultLocker = data.find(locker => locker.locker_body_id === lockerBodyId);
          if (defaultLocker) {
            setSelectedLocker({ value: defaultLocker.locker_body_id, label: defaultLocker.locker_body_name });
          }
        }
      })
      .catch(error => {
        console.error('Error fetching lockers data:', error);
      });
  }, [lockerBodyId]);

  useEffect(() => {
    if (lockerBodyId) {
      axiosSpring.get(`/lockers?locker_body_id=${lockerBodyId}`)
        .then(response => {
          const data = response.data.data;
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });
    }
  }, [lockerBodyId]);

  const rows = Math.max(...products.map(product => product.locker_row), 0);
  const columns = Math.max(...products.map(product => product.locker_column), 0);

  const getProductInLocker = (column, row) => {
    return products.find(product => product.locker_column === column && product.locker_row === row);
  };

  // 오른쪽 하단 사물함의 좌표를 제외할 조건으로 설정합니다
  const excludeRow = rows; // 맨 아래 행
  const excludeColumn = columns; // 맨 오른쪽 열

  const isHighlighted = (column, row) => {
    const product = getProductInLocker(column, row);
    const isExcluded = (column === excludeColumn && row === excludeRow);

    return product && product.product_nm === null && !isExcluded;
  };

  const handleLockerClick = (product) => {
    navigate('/ItemRegistration', { state: { product } });
    console.log('product: ', product)

       // borrowedItems 상태에 따라 sci와 mou 값 설정
       const newStatus = { sci: 0, mou: 0 };
    
        if (product.locker_id === 1) {  //가위
          newStatus.sci = 1;
        } else if (product.locker_id === 3) {  // 마우스
          newStatus.mou = 1;
        };
       // setBorrowedItemsStatus(newStatus); // 상태 업데이트
       console.log('newStatus: ', newStatus)
       // console.log('borrowedItemsStatus: ', borrowedItemsStatus)
   
       open(newStatus)
       .then(response => {
         console.log('Response from server:', response);
       })
       .catch(e => {
         console.error('Error:',e)
       })
  };

  return (
    <>
      <button className="btn-main" onClick={() => navigate('/')}>HOME</button>

      <div className='locker-frame'>
        <div className="locker-container1">
          <div className="locker-title">
            빈 사물함을<br /> 선택 해주세요<br /> <br />
          </div>
          <div className='locker-grid'>
            {rows > 0 && columns > 0 &&
              Array.from({ length: rows }).map((_, rowIndex) =>
                <div key={`row-${rowIndex}`} className='locker-row'>
                  {Array.from({ length: columns }).map((_, colIndex) => {
                    const product = getProductInLocker(colIndex + 1, rowIndex + 1);
                    const highlight = isHighlighted(colIndex + 1, rowIndex + 1);
                    return (
                      <div 
                        key={`col-${colIndex}`} 
                        className={`locker-box ${highlight ? 'locker-highlight' : ''}`}
                        onClick={() => product && handleLockerClick(product)}
                      >
                        {product ? product.product_nm : ''}
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeLocker;
