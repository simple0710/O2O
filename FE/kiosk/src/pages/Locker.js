import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Locker.css';

const Locker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [highlightedLockers, setHighlightedLockers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { borrowedItems } = location.state || {};

  console.log('카트에 담은 물건', borrowedItems);

  useEffect(() => {
    // 사물함 이름 데이터 불러오기
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

        // borrowedItems의 body_id에 해당하는 사물함 설정
        if (borrowedItems && borrowedItems.length > 0) {
          const defaultLocker = data.find(locker => locker.locker_body_id === borrowedItems[0].body_id);
          if (defaultLocker) {
            setSelectedLocker({ value: defaultLocker.locker_body_id, label: defaultLocker.locker_body_name });
          }
        }
      })
      .catch(error => {
        console.error('Error fetching lockers data:', error);
      });
  }, [borrowedItems]);

  useEffect(() => {
    if (selectedLocker) {
      axios.get(`/lockers?locker_body_id=${selectedLocker.value}`)
        .then(response => {
          const data = response.data.data;
          setProducts(data);
          console.log('Product data:', data);

          // 대여한 물품 정보로부터 강조할 사물함 설정
          if (borrowedItems) {
            const highlighted = borrowedItems
              .filter(item => item.body_id === selectedLocker.value)
              .map(item => ({ locker_column: item.column, locker_row: item.row }));
            setHighlightedLockers(highlighted);
            console.log('Highlighted lockers:', highlighted);
          }
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });
    }
  }, [selectedLocker, borrowedItems]);

  // useEffect(() => {
  //   // 페이지 접근 시 사물함 열기 요청
  //   axios.post('http://192.168.100.218:5000/open')  // Flask 서버의 실제 IP 주소 사용
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error opening the locker:', error);
  //     });
  // }, []);

  const back = () => {
    navigate('/');
  };

  const borrowfinish = () => {
    navigate('/BorrowFinish');
  };

  // 특정 사물함에 물품이 있는지 확인하는 함수
  const getProductInLocker = (column, row) => {
    return products.find(product => product.locker_column === column && product.locker_row === row);
  };

  return (
    <>
      {/* 메인 페이지 버튼 */}
      <button className="btn-main" onClick={back}>메인 페이지</button>

      <div className='locker-frame'>
        <div className="locker-container1">
          <div className="locker-title">
            표시된 사물함에서<br /> 물건을 가져가세요<br /> <br />
          </div>
          <div className='locker-grid'>
            {selectedLocker && lockersData.length > 0 && 
              Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).row }).map((_, rowIndex) =>
                <div key={`row-${rowIndex}`} className='locker-row'>
                  {Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).column }).map((_, colIndex) => {
                    const product = getProductInLocker(colIndex + 1, rowIndex + 1);
                    const isHighlighted = highlightedLockers.some(item => item.locker_column === colIndex + 1 && item.locker_row === rowIndex + 1);
                    console.log(`Row: ${rowIndex + 1}, Column: ${colIndex + 1}, isHighlighted: ${isHighlighted}`);
                    return (
                      <div 
                        key={`col-${colIndex}`} 
                        className={`locker-box ${isHighlighted ? 'locker-highlight' : ''}`}
                      >
                         {console.log(`Product: ${product ? product.product_nm : 'None'}, isHighlighted: ${isHighlighted}, Classes: locker-box ${isHighlighted ? 'locker-highlight' : ''}`)}
                        {product ? product.product_nm : ''}
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
          <button className='button1' onClick={borrowfinish}>확인</button>
        </div>
      </div>
    </>
  );
};

export default Locker;

