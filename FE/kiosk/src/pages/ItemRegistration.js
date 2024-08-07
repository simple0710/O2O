import React, { useState } from 'react';
import { Button, TextField, IconButton, Typography, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ItemRegistration.css';
import {postRegisterItem} from '../api/kioskpost.js';

const ItemRegistration = () => {
  const [quantity, setQuantity] = useState(0);
  const [productName, setProductName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {product} = location.state || {};

  console.log('물품등록: ', product)

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);


  const back = () => {
    navigate('/ServiceSelection');
  };

  const registerfinish = async() => {
    const registerData = {
      locker_id : product?.locker_id,
      product_nm : productName,
      user_id: product?.user_id || 4,
      product_cnt : quantity,
      total_count: quantity
    };

    try {
      await postRegisterItem(registerData);
      console.log('물품이 성공적으로 등록되었습니다.' , registerData)
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
        <TextField label="이름" variant="outlined" size="small" className="input" 
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
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

