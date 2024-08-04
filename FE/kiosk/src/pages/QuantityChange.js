import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/QuantityChange.css';

const ItemRegistration = () => {
  const [quantity, setQuantity] = useState(0);
  const [selectedLocker, setSelectedLocker] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [lockers, setLockers] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // 모든 사물함 데이터 불러오기
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        console.log('API 응답 데이터:', data); // API 응답 데이터 콘솔 출력

        // 모든 락커 데이터 저장
        setLockers(data);
      })
      .catch(error => {
        console.error('Error fetching lockers data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedLocker) {
      // 선택된 사물함의 제품 데이터 불러오기
      axios.get(`/lockers?locker_body_id=${selectedLocker}`)
        .then(response => {
          const data = response.data.data;
          console.log('API 응답 데이터 (물품):', data); // API 응답 데이터 콘솔 출력
          
          // 해당 사물함의 물품 필터링
          const filteredProducts = data.filter(product => product.product_cnt > 0);
          setProducts(filteredProducts);
          console.log('필터링된 제품 리스트:', filteredProducts);
          setSelectedItem(''); // 사물함이 변경될 때 선택된 물품 초기화
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });
    }
  }, [selectedLocker]);

  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const handleIncrease = () => setQuantity(quantity + 1);

  const quantityChangeFinish = () => {
    navigate('/QuantityChangeFinish');
  };

  return (
    <div className='frame-container'>
      <div>
        <button className="btn-main" onClick={() => navigate('/')}>
          메인 페이지
        </button>
      </div>
      <Box className="container1">
        <Typography variant="h5" component="h2" gutterBottom>
          수량변경
        </Typography>

        <FormControl fullWidth>
          <InputLabel>사물함 선택</InputLabel>
          <Select
            value={selectedLocker}
            onChange={(event) => setSelectedLocker(event.target.value)}
            label="사물함 선택"
          >
            {lockers.length > 0 ? (
              lockers.map(locker => (
                <MenuItem key={locker.locker_body_id} value={locker.locker_body_id}>
                  {locker.locker_body_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>사물함을 선택할 수 없습니다</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>물품 선택</InputLabel>
          <Select
            value={selectedItem}
            onChange={(event) => setSelectedItem(event.target.value)}
            label="물품 선택"
            disabled={!selectedLocker} // 사물함을 선택해야 물품 선택 가능
          >
            {products.length > 0 ? (
              products.map(item => (
                <MenuItem key={item.product_id} value={item.product_id}>
                  {item.product_nm}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>선택할 수 있는 물품이 없습니다</MenuItem>
            )}
          </Select>
        </FormControl>

        <Box className="image-placeholder" mt={2}>
          <span role="img" aria-label="placeholder" style={{ fontSize: '100px' }}>
            {products.find(item => item.product_id === selectedItem)?.icon || '❓'}
          </span>
        </Box>

        <Box className="quantity-controls" mt={2} display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          <Typography variant="h6" component="span" mx={2}>
            {quantity}
          </Typography>
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </Box>
        
        <Button variant="contained" color="primary" className="register-button" fullWidth sx={{ mt: 2 }} onClick={quantityChangeFinish}>
          등록 <br /> 
        </Button>
        <br/>
      </Box>
    </div>
  );
};

export default ItemRegistration;
