import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {axiosSpring} from '../api/axios';
import Select from 'react-select';
import '../styles/Locker.css';
import {open} from '../api/cameraget'
import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';

const ChangeLocker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [highlightedLockers, setHighlightedLockers] = useState([]);
  const [lockerBodyId, setLockerBodyId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    saveLockerBodyIdFromLocal();

    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);
  }, []);

  useEffect(() => {
    console.log('Updated lockerBodyId:', lockerBodyId);
  }, [lockerBodyId]);

  useEffect(() => {
    axiosSpring.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

        // Set default locker
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
  }, []);

  useEffect(() => {
    if (lockerBodyId) {
      axiosSpring.get(`/lockers?locker_body_id=${lockerBodyId}`)
        .then(response => {
          const data = response.data.data;
          setProducts(data);
          console.log('Product data:', data);
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });
    }
  }, [lockerBodyId]);

  // 로커의 행과 열 수를 결정
  const rows = Math.max(...products.map(product => product.locker_row), 0);
  const columns = Math.max(...products.map(product => product.locker_column), 0);

  const getProductInLocker = (column, row) => {
    return products.find(product => product.locker_column === column && product.locker_row === row);
  };

  const handleLockerClick = (product) => {
    console.log('Selected product:', product);
    navigate('/QuantityChange', { state: { product } });

        // borrowedItems 상태에 따라 sci와 mou 값 설정
        const newStatus = { sci: 0, mou: 0 };
        if (product.product_id === 76) {
          newStatus.sci = 1;
        } else if (product.product_id === 3) {
          newStatus.mou = 1;
        }
        console.log('newStatus:', newStatus);
    
        open(newStatus)
          .then(response => {
            console.log('Response from server:', response);
          })
          .catch(e => {
            console.error('Error:', e);
          });
    
  };

  return (
    <>
      <button className="btn-main" onClick={() => navigate('/')}>HOME</button>

      <div className='locker-frame'>
        <div className="locker-container1">
          <div className="locker-title">
            수량을 변경할 사물함을<br />선택해주세요<br /> <br />
          </div>
          <div className='locker-grid'>
            {rows > 0 && columns > 0 &&
              Array.from({ length: rows }).map((_, rowIndex) =>
                <div key={`row-${rowIndex}`} className='locker-row'>
                  {Array.from({ length: columns }).map((_, colIndex) => {
                    const product = getProductInLocker(colIndex + 1, rowIndex + 1);
                    // const highlight = isHighlighted(colIndex + 1, rowIndex + 1);
                    // console.log(`Row: ${rowIndex + 1}, Column: ${colIndex + 1}, isHighlighted: ${highlight}`);
                    return (
                      <div 
                        key={`col-${colIndex}`} 
                        className='locker-box'
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
