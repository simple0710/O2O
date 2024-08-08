import React, { useState } from 'react';
import { Button, TextField, IconButton, Typography, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/ItemRegistration.css';

const ItemRegistration = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const navigate = useNavigate();

  const back = () => {
    navigate('/ServiceSelection');
  };

  const registerfinish = () => {
    navigate('/RegisterFinish');
  };

  return (
    <div className="frame-container">
      <button className="btn-main" onClick={() => navigate('/')}>
          HOME
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
        <TextField label="이름" variant="outlined" size="small" className="input" />
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
