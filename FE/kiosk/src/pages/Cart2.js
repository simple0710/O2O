import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart2.css';
import axios from 'axios';
import Select from 'react-select';

const Cart2 = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]); // 장바구니 상태 추가

  const navigate = useNavigate();

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
    let isMounted = true; // 컴포넌트가 마운트된 상태를 추적
    const source = axios.CancelToken.source(); // CancelToken 생성

    if (selectedLocker) {
      // 선택된 사물함의 제품 데이터 불러오기
      axios.get(`/lockers?locker_body_id=${selectedLocker.value}`, { cancelToken: source.token })
        .then(response => {
          if (isMounted) { // 컴포넌트가 마운트된 상태에서만 업데이트
            const data = response.data.data;
            // 이름이 있는 제품만 필터링
            const productList = data
              .filter(item => item.product_nm) // 이름이 있는 제품만 선택
              .map(item => ({
                id: item.product_id,
                name: item.product_nm,
                column: item.locker_column,
                row: item.locker_row,
                quantity: item.product_cnt,
                icon: '📦', // 아이콘은 임의로 설정
                ...item // 모든 데이터를 포함하도록 스프레드 연산자 사용
              }));
            setProducts(productList);
            // 각 제품의 수량을 상태로 초기화
            const initialQuantities = productList.reduce((acc, item) => {
              acc[item.id] = 0;
              return acc;
            }, {});
            setQuantities(initialQuantities);
            console.log('Product data:', productList);
          }
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            console.error('Error fetching products data:', error);
          }
        });
    }

    return () => {
      isMounted = false; // 컴포넌트 언마운트 상태 설정
      source.cancel("Operation canceled by the user."); // 이전 요청 취소
    };
  }, [selectedLocker]);

  const options = lockersData.map(lockerData => ({
    value: lockerData.locker_body_id,
    label: lockerData.locker_body_name
  }));

  const handleChange = selectedOption => {
    setSelectedLocker(selectedOption);
    console.log('Selected locker:', selectedOption);
  };

  const increaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.id === id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newItem = products.find(item => item.id === id);
        return [...prevCartItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 }));
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCartItems.filter(item => item.id !== id);
      }
    });
  };

  const logCartItems = () => {
    console.log("장바구니에 담긴 아이템:", cartItems);
    // Locker 페이지로 대여된 물품 정보 전달
    navigate('/locker', { state: { borrowedItems: cartItems } });
  };

  return (
    <> {/* 가상의 전체 큰 부모 */}
      {/* 메인 페이지 이동 버튼 */}
      <div>
        <button className="btn-main" onClick={() => navigate('/')}>
          HOME
        </button>
      </div>

      {/* 물품 리스트 메인 컴포넌트 */}
      <div className='cart-list-container'>
        <div className='cart-list-box'>
          {/* 제목 */}
          <h3>물품 리스트</h3>

          {/* 층별 사물함 드롭다운 */}
          <div>
            <Select 
              options={options} 
              value={selectedLocker}
              onChange={handleChange}
              placeholder="Select a locker"
            />
          </div>

          {/* 물품 리스트 */}
          <div className='products-list-box'>
            {products.length > 0 ? (
              products.map(item => (
                <div key={item.id} className='item-list-cart2'>
                  <div className='product-list-cart2 product-list-icon'>{item.icon}</div>
                  <div className='product-list-cart2 product-list-name'>{item.name}</div>
                  <div className='product-list-cart2 product-list-btn'>
                    <button className="item-list-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span className='btn-space'>{quantities[item.id]}</span>
                    <button className="item-list-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
              ))
            ) : (
              <h4>대여 가능한 물품이 없습니다 <span role="img" aria-label="머쓱">😅</span></h4>
            )}
          </div>

          {/* 장바구니 */}
          <div className='empty-cart'>
            <p> <span role="img" aria-label="장바구니">🛒</span> 장바구니  </p>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <p key={item.id}>{item.name} - {item.quantity}</p>
              ))
            ) : (
              <p>장바구니가 비어 있습니다.</p>
            )}
          </div>

          {/* 대여 버튼 */}
          <button className='borrow-btn' onClick={logCartItems}>대여</button>
        </div>
      </div> 
    </>
  );
}

export default Cart2;
