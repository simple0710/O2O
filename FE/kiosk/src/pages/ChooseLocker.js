// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Select from 'react-select';
// import '../styles/Locker.css';

// const ChangeLocker = () => {
//   const [lockersData, setLockersData] = useState([]);
//   const [selectedLocker, setSelectedLocker] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [highlightedLockers, setHighlightedLockers] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // 사물함 이름 데이터 불러오기
//     axios.get('/lockers/names')
//       .then(response => {
//         const data = response.data.data;
//         setLockersData(data);
//         console.log('Lockers data:', data);

//         // 기본 첫 번째 사물함 선택
//         if (data.length > 0) {
//           setSelectedLocker({ value: data[0].locker_body_id, label: data[0].locker_body_name });
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching lockers data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedLocker) {
//       axios.get(`/lockers?locker_body_id=${selectedLocker.value}`)
//         .then(response => {
//           const data = response.data.data;
//           setProducts(data);
//           console.log('Product data:', data);
//         })
//         .catch(error => {
//           console.error('Error fetching products data:', error);
//         });
//     }
//   }, [selectedLocker]);

//   useEffect(() => {
//     // BorrowFinish에서 전달받은 대여한 물품 정보
//     if (location.state && location.state.borrowedItems) {
//       // 선택된 층의 대여한 물품만 강조
//       const filteredItems = location.state.borrowedItems.filter(
//         item => item.body_id === selectedLocker?.value
//       );
//       setHighlightedLockers(filteredItems);
//       console.log('Filtered borrowed items for the selected locker:', filteredItems);
//     }
//   }, [location.state, selectedLocker]);

//   const handleChange = selectedOption => {
//     setSelectedLocker(selectedOption);
//     console.log('Selected locker:', selectedOption);
//   };

//   const handleLockerClick = (product) => {
//     console.log('Selected product:', product);
//     navigate('/itemregistration', { state: { product } });
//   };

//   return (
//     <>
//       <button className="btn-main" onClick={() => navigate('/')}>메인 페이지</button>

//       <div className='locker-frame'>
//         <div className="locker-container1">
//           <div className="locker-title">
//             빈 사물함을<br />선택해주세요<br /> <br />
//           </div>
//           <div className='locker-dropdown'>
//             <Select 
//               options={lockersData.map(locker => ({
//                 value: locker.locker_body_id,
//                 label: locker.locker_body_name
//               }))}
//               value={selectedLocker}
//               onChange={handleChange}
//               placeholder="사물함을 선택하세요"
//             />
//           </div>
//           <div className='locker-grid'>
//             {selectedLocker && lockersData.length > 0 && 
//               Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).row }).map((_, rowIndex) =>
//                 <div key={`row-${rowIndex}`} className='locker-row'>
//                   {Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).column }).map((_, colIndex) => {
//                     const product = products.find(product => product.locker_column === colIndex + 1 && product.locker_row === rowIndex + 1);
//                     const isHighlighted = highlightedLockers.some(item => item.locker_column === colIndex + 1 && item.locker_row === rowIndex + 1);
//                     return (
//                       <div 
//                         key={`col-${colIndex}`} 
//                         className={`locker-box ${isHighlighted ? 'locker-highlight' : ''}`}
//                         onClick={() => product && handleLockerClick(product)}
//                       >
//                         {product ? product.product_nm : ''}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )
//             }
//           </div>
//           <button className='button1' onClick={() => navigate('/BorrowFinish')}>확인</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChangeLocker;



import React, { useState } from 'react';
import { Button, TextField, IconButton, Typography, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ItemRegistration.css';
import { postRegisterItem } from '../api/kioskpost.js';

const ItemRegistration = () => {
  const [quantity, setQuantity] = useState(0);
  const [productName, setProductName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  console.log('물품등록: ', product);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const back = () => {
    navigate('/ServiceSelection');
  };

  const registerfinish = async () => {
    const registerData = {
      locker_id: product?.locker_id,
      product_nm: productName,
      user_id: product?.user_id || 4,
      product_cnt: quantity,
      total_count: quantity
    };

    console.log('전송할 데이터:', registerData);

    try {
      await postRegisterItem(registerData);
      console.log('물품이 성공적으로 등록되었습니다.', registerData);
      navigate('/RegisterFinish');
    } catch (e) {
      console.error('물품 등록에 실패하였습니다.', e);
    }
  };

  return (
    <div className="frame-container">
      <button className="btn-main" onClick={() => navigate('/')}>
        메인 페이지
      </button>
      <Box className="container1">
        <Typography variant="h5" component="h2" gutterBottom>
          물품 등록
        </Typography>
        <Box className="image-placeholder">
          <span role="img" aria-label="placeholder" style={{ fontSize: '100px' }}>
            📷
          </span>
        </Box>
        <TextField
          label="이름"
          variant="outlined"
          size="small"
          className="input"
          value={productName} // value를 productName 상태와 연결
          onChange={(e) => setProductName(e.target.value)} // onChange 이벤트 핸들러 설정
        />
        <Box className="quantity-controls">
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          <Typography variant="h6" component="span">
            {quantity}
          </Typography>
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </Box>
        <Button variant="contained" color="primary" className="register-button" onClick={registerfinish}>
          등록
        </Button>
        <br/>
      </Box>
    </div>
  );
};

export default ItemRegistration;
