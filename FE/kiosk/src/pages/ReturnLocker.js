import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Locker.css';
import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';
import {putReturn} from '../api/kioskpost.js';

const ReturnLocker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [highlightedProductIds, setHighlightedProductIds] = useState([]); // product_id로 하이라이트
  const [lockerBodyId, setLockerBodyId] = useState(null);
  const [selectedLocker, setSelectedLocker] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { returnData } = location.state || {};

  console.log('반납할 물건', returnData);

  useEffect(() => {
    saveLockerBodyIdFromLocal();

    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);
  }, []);

  useEffect(() => {
    console.log('Updated lockerBodyId:', lockerBodyId);
  }, [lockerBodyId]);

  useEffect(() => {
    // 사물함 이름 데이터 불러오기
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

        // borrowedItems의 body_id에 해당하는 사물함 설정
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
      axios.get(`/lockers?locker_body_id=${lockerBodyId}`)
        .then(response => {
          const data = response.data.data;
          setProducts(data);
          console.log('Product data:', data);

          if (returnData) {
            // 하이라이트할 product_id 설정
            const highlightedIds = returnData.products.map(item => item.product_id);
            setHighlightedProductIds(highlightedIds);
            console.log('Highlighted product IDs:', highlightedIds);
          }
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });
    }
  }, [lockerBodyId, returnData]);

  const back = () => {
    navigate('/');
  };

  // 사물함에서 물품을 찾는 함수
  const getProductInLocker = (column, row) => {
    return products.find(product => product.locker_column === column && product.locker_row === row);
  };

  // product_id로 하이라이트 여부 결정
  const isHighlighted = (column, row) => {
    const product = getProductInLocker(column, row);
    console.log('Product:', product); // 제품 정보 콘솔에 출력
    return product && highlightedProductIds.includes(product.product_id);
  };

  // 로커의 행과 열 수를 결정
  const rows = Math.max(...products.map(product => product.locker_row), 0);
  const columns = Math.max(...products.map(product => product.locker_column), 0);

  const returnfinish = async () => {
    try{
      const response = await putReturn(returnData)
      console.log('Return response', response);
      navigate('/ReturnFinish');
    } catch (e) {
      console.error('Error :',e)
    }
  }



  return (
    <>
      <button className="btn-main" onClick={back}>메인 페이지</button>

      <div className='locker-frame'>
        <div className="locker-container1">
          <div className="locker-title">
            표시된 사물함에서<br /> 물건을 가져가세요<br /> <br />
          </div>
          <div className='locker-grid'>
            {rows > 0 && columns > 0 &&
              Array.from({ length: rows }).map((_, rowIndex) =>
                <div key={`row-${rowIndex}`} className='locker-row'>
                  {Array.from({ length: columns }).map((_, colIndex) => {
                    const product = getProductInLocker(colIndex + 1, rowIndex + 1);
                    const highlight = isHighlighted(colIndex + 1, rowIndex + 1);
                    console.log(`Row: ${rowIndex + 1}, Column: ${colIndex + 1}, isHighlighted: ${highlight}`);
                    return (
                      <div 
                        key={`col-${colIndex}`} 
                        className={`locker-box ${highlight ? 'locker-highlight' : ''}`}
                      >
                        {product ? product.product_nm : ''}
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
          <button className='button1' onClick={returnfinish}>확인</button>
        </div>
      </div>
    </>
  );
};

export default ReturnLocker;
