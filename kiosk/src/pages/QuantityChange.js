import React, { useState } from 'react';
import { Button, IconButton, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import '../styles/QuantityChange.css';

const ItemRegistration = () => {
  const [quantity, setQuantity] = useState(0);
  const [selectedItem, setSelectedItem] = useState('📷');

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);
  const handleItemChange = (event) => setSelectedItem(event.target.value);
  const navigate = useNavigate();
  const quantitychangefinish = () => {
    navigate('/QuantityChangeFinish')
  }
  const back = () => {
    navigate('/ServiceSelection');
  };
  return (
    <div className='frame-container'>
    <Box className="container1">
        <button className="btn btn-primary btn-sm mr-2 back-button" onClick={back}>
          뒤로가기
        </button>
      <Typography variant="h5" component="h2" gutterBottom>
        수량변경
      </Typography>
      
      <FormControl fullWidth>
        <InputLabel>물품 선택</InputLabel>
        <Select
          value={selectedItem}
          onChange={handleItemChange}
          label="물품 선택"
        >
          <MenuItem value="📷">📷 카메라</MenuItem>
          <MenuItem value="📱">📱 스마트폰</MenuItem>
          <MenuItem value="💻">💻 노트북</MenuItem>
          <MenuItem value="🎧">🎧 헤드폰</MenuItem>
          <MenuItem value="⌚">⌚ 시계</MenuItem>
        </Select>
      </FormControl>

      <Box className="image-placeholder" mt={2}>
        <span role="img" aria-label="placeholder" style={{ fontSize: '100px' }}>
          {selectedItem}
        </span>
      </Box>
      
     
      
      <Box className="quantity-controls" mt={2} display="flex" alignItems="center" justifyContent="center">
        <IconButton onClick={handleIncrease}>
          <Add />
        </IconButton>
        <Typography variant="h6" component="span" mx={2}>
          {quantity}
        </Typography>
        <IconButton onClick={handleDecrease}>
          <Remove />
        </IconButton>
      </Box>
      
      <Button variant="contained" color="primary" className="register-button" fullWidth sx={{ mt: 2 }} onClick={quantitychangefinish}>
        등록
      </Button>
    </Box>
    </div>
  );
};

export default ItemRegistration;
