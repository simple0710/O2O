import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import '../styles/Locker.css';

const Locker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [highlightedLockers, setHighlightedLockers] = useState([]); // 대여한 물품 사물함 강조 상태

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 사물함 이름 데이터 불러오기
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

        // 기본 1층 선택
        const defaultLocker = data.find(locker => locker.locker_body_id === 1);
        if (defaultLocker) {
          setSelectedLocker({ value: defaultLocker.locker_body_id, label: defaultLocker.locker_body_name });
        }
      })
      .catch(error => {
        console.error('Error fetching lockers data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedLocker) {
      axios.get(`/lockers?locker_body_id=${selectedLocker.value}`)
        .then(response => {
          const data = response.data.data;
          setProducts(data);
          console.log('Product data:', data);
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });
    }
  }, [selectedLocker]);

  useEffect(() => {
    // BorrowFinish에서 전달받은 대여한 물품 정보
    if (location.state && location.state.borrowedItems) {
      // 선택된 층의 대여한 물품만 강조
      const filteredItems = location.state.borrowedItems.filter(
        item => item.locker_body_id === selectedLocker?.value
      );
      setHighlightedLockers(filteredItems);
      console.log('Filtered borrowed items for the selected locker:', filteredItems);
    }
  }, [location.state, selectedLocker]);

  const options = lockersData.map(lockerData => ({
    value: lockerData.locker_body_id,
    label: lockerData.locker_body_name
  }));

  const handleChange = selectedOption => {
    setSelectedLocker(selectedOption);
    console.log('Selected locker:', selectedOption);
  };

  const back = () => {
    navigate('/');
  };

  // 특정 사물함에 물품이 있는지 확인하는 함수
  const isProductInLocker = (column, row) => {
    return products.some(product => product.locker_column === column && product.locker_row === row);
  };

  // 대여한 물품이 있는 사물함인지 확인하는 함수
  const isLockerHighlighted = (column, row) => {
    return highlightedLockers.some(item => item.locker_column === column && item.locker_row === row);
  };

  return (
    <div className='locker-frame-container'>
      <div className="locker-container1">
        <button className="btn btn-primary btn-sm locker-back-button" onClick={back}>뒤로가기</button>
        <div className="locker-header">
          표시된 사물함에서<br /> 물건을 가져가세요<br /> <br />
        </div>
        <div>
          <Select 
            options={options} 
            value={selectedLocker}
            onChange={handleChange}
            placeholder="층을 선택하세요"
          />
        </div>
        <div className='locker-grid'>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div 
                key={index} 
                className={`locker-box locker ${isLockerHighlighted(product.locker_column, product.locker_row) ? 'highlight' : ''}`} 
                style={{
                  top: `${(product.locker_row - 1) * 20}%`, 
                  left: `${(product.locker_column - 1) * 25}%`,
                  backgroundColor: isLockerHighlighted(product.locker_column, product.locker_row) ? 'red' : ''
                }}
              >
                {product.product_nm}
              </div>
            ))
          ) : (
            <p>대여 가능한 물품이 없습니다</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locker;
