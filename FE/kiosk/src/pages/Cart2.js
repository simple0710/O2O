import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart2.css';
import axios from 'axios';
import Select from 'react-select';
import Swal from "sweetalert2";

const Cart2 = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

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
    let isMounted = true;
    const source = axios.CancelToken.source();

    if (selectedLocker) {
      axios.get(`/lockers?locker_body_id=${selectedLocker.value}`, { cancelToken: source.token })
        .then(response => {
          if (isMounted) {
            const data = response.data.data;
            const productList = data
              .filter(item => item.product_nm)
              .map(item => ({
                id: item.product_id,
                name: item.product_nm,
                column: item.locker_column,
                row: item.locker_row,
                quantity: item.product_cnt,
                icon: '📦',
                ...item
              }));
            setProducts(productList);
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
      isMounted = false;
      source.cancel("Operation canceled by the user.");
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
    const product = products.find(item => item.id === id);
    if (product) {
      const maxQuantity = product.quantity;
      setQuantities(prev => {
        const newQuantity = prev[id] + 1;
        if (newQuantity <= maxQuantity) {
          return { ...prev, [id]: newQuantity };
        }
        return prev;
      });

      setCartItems(prevCartItems => {
        const existingItem = prevCartItems.find(item => item.id === id);
        if (existingItem) {
          if (existingItem.quantity < product.quantity) {
            return prevCartItems.map(item =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return prevCartItems;
        } else {
          // Only add to cart if quantity is greater than 0
          if (product.quantity > 0) {
            return [...prevCartItems, { ...product, quantity: 1 }];
          }
          return prevCartItems;
        }
      });
    }
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
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '장바구니 비어 있음',
        text: '장바구니에 담긴 물품이 없습니다. 물품을 추가한 후 대여를 진행해 주세요.',
        confirmButtonText: '확인'
      });
      return;
    }
    console.log("장바구니에 담긴 아이템:", cartItems);
    navigate('/locker', { state: { borrowedItems: cartItems } });
  };

  return (
    <>
      <div>
        <button className="btn-main" onClick={() => navigate('/')}>
          HOME
        </button>
      </div>

      <div className='cart-list-container'>
        <div className='cart-list-box'>
          <h3>물품 리스트</h3>

          <div>
            <Select 
              options={options} 
              value={selectedLocker}
              onChange={handleChange}
              placeholder="Select a locker"
            />
          </div>

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

          <button className='borrow-btn' onClick={logCartItems}>대여</button>
        </div>
      </div>
    </>
  );
}

export default Cart2;

