import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import '../styles/Locker.css';

const ChangeLocker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [highlightedLockers, setHighlightedLockers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 사물함 이름 데이터 불러오기
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

        // 기본 첫 번째 사물함 선택
        if (data.length > 0) {
          setSelectedLocker({ value: data[0].locker_body_id, label: data[0].locker_body_name });
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
        item => item.body_id === selectedLocker?.value
      );
      setHighlightedLockers(filteredItems);
      console.log('Filtered borrowed items for the selected locker:', filteredItems);
    }
  }, [location.state, selectedLocker]);

  const handleChange = selectedOption => {
    setSelectedLocker(selectedOption);
    console.log('Selected locker:', selectedOption);
  };

  const handleLockerClick = (product) => {
    console.log('Selected product:', product);
    navigate('/QuantityChange', { state: { product } });
  };

  return (
    <>
      <button className="btn-main" onClick={() => navigate('/')}>HOME</button>

      <div className='locker-frame'>
        <div className="locker-container1">
          <div className="locker-title">
            수량을 변경할 사물함을<br />선택해주세요<br /> <br />
          </div>
          <div className='locker-dropdown'>
            <Select 
              options={lockersData.map(locker => ({
                value: locker.locker_body_id,
                label: locker.locker_body_name
              }))}
              value={selectedLocker}
              onChange={handleChange}
              placeholder="사물함을 선택하세요"
            />
          </div>
          <div className='locker-grid'>
            {selectedLocker && lockersData.length > 0 && 
              Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).row }).map((_, rowIndex) =>
                <div key={`row-${rowIndex}`} className='locker-row'>
                  {Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).column }).map((_, colIndex) => {
                    const product = products.find(product => product.locker_column === colIndex + 1 && product.locker_row === rowIndex + 1);
                    const isHighlighted = highlightedLockers.some(item => item.locker_column === colIndex + 1 && item.locker_row === rowIndex + 1);
                    return (
                      <div 
                        key={`col-${colIndex}`} 
                        className={`locker-box ${isHighlighted ? 'locker-highlight' : ''}`}
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
          {/* <button className='button1' onClick={() => navigate('/BorrowFinish')}>확인</button> */}
        </div>
      </div>
    </>
  );
};

export default ChangeLocker;
