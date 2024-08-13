import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart2.css';
import { axiosSpring } from '../api/axios';
import axios from "axios"
import Select from 'react-select';
import Swal from "sweetalert2";
import { getUserFromSession } from '../util/sessionUtils.js';
import ReservationModal from './ReservationModal';

const Cart2 = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // 페이지네이션 관련 상태값들
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수

  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    axiosSpring.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);

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
      // 새로운 층을 선택할 때마다 제품 목록을 초기화
      setProducts([]);
      setQuantities({});

      axiosSpring.get(`/lockers?locker_body_id=${selectedLocker.value}`, { cancelToken: source.token })
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
          }
        })
        .catch(error => {
          if (axiosSpring.isCancel(error)) {
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

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const options = lockersData.map(lockerData => ({
    value: lockerData.locker_body_id,
    label: lockerData.locker_body_name
  }));

  const handleChange = selectedOption => {
    setSelectedLocker(selectedOption);
    // 층이 변경될 때 페이지를 초기화
    setCurrentPage(1);
  };

  const back = () => {
    navigate('/');
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

  const logCartItems = async () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '장바구니 비어 있음',
        text: '장바구니에 담긴 물품이 없습니다. 물품을 추가한 후 대여를 진행해 주세요.',
        confirmButtonText: '확인'
      });
      return;
    }

    const user = getUserFromSession();

    const formattedItems = cartItems.map(item => ({
      product_id: item.id,
      product_cnt: item.quantity,
      locker_id: item.locker_id,
      status_id: 1 
    }));

    const requestData = {
      reserve_id: null,
      locker_body_id: selectedLocker.value,
      products: formattedItems,
      user_id: user.user_id
    };

    try {
      const response = await axiosSpring.post('/kiosk/rent', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 200) {
        localStorage.removeItem('cartItems');
        setCartItems([]);

        Swal.fire({
          icon: 'success',
          title: '대여 성공',
          text: `대여가 성공적으로 완료되었습니다. 대여 ID: ${response.data.data.rent_id}`,
          confirmButtonText: '확인'
        }).then(() => {
          navigate('/locker', { state: { borrowedItems: cartItems } });
        });
      } else {
        throw new Error(response.data.message || '대여 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '대여 실패',
        text: '대여 처리 중 오류가 발생했습니다. 다시 시도해 주세요.',
        confirmButtonText: '확인'
      });
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProceedToCart = (selectedItems) => {
    setCartItems(selectedItems);
  };

  // 페이지네이션 관련 함수들
  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + direction;
      return Math.max(1, Math.min(newPage, Math.ceil(products.length / itemsPerPage)));
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const renderPagination = () => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(-1)}
          className="pagination-button"
          disabled={currentPage === 1}
        >
          <svg height="20" width="20">
            <polygon points="10,0 0,10 10,20" fill="#0093ed" />
          </svg>
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(1)}
          className="pagination-button"
          disabled={currentPage === totalPages}
        >
          <svg height="20" width="20">
            <polygon points="0,0 10,10 0,20" fill="#0093ed" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      <button className="btn-main" onClick={back}>HOME</button>
      <div>
        <button className="btn-reservation" onClick={handleOpenModal}>
          예약 내역 보기
        </button>
      </div>

      <ReservationModal
        show={showModal}
        handleClose={handleCloseModal}
        onProceedToCart={handleProceedToCart}
      />

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
            {selectedProducts.length > 0 ? (
              selectedProducts.map(item => (
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

          {products.length > 0 && renderPagination()}

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
