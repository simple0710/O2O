import React, { useState } from 'react';
import { Button, IconButton, Typography, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/QuantityChange.css';

const QuantityChange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [product_cnt, setProductCnt] = useState(product?.product_cnt || 0);
  const [total_cnt, setTotalCnt] = useState(product?.total_cnt || 0);

  const handleDecrease = () => {
    if (product_cnt > 0) {
      const newProductCnt = product_cnt - 1;
      setProductCnt(newProductCnt);
      console.log('수량 감소:', { productId: product.product_id, product_cnt: newProductCnt, total_cnt });
    }
  };

  const handleIncrease = () => {
    const newProductCnt = product_cnt + 1;
    let newTotalCnt = total_cnt;

    if (newProductCnt > total_cnt) {
      newTotalCnt = newProductCnt;
      setTotalCnt(newTotalCnt);
      console.log('총 수량 증가:', { productId: product.product_id, product_cnt: newProductCnt, total_cnt: newTotalCnt });
    }

    setProductCnt(newProductCnt);
    console.log('수량 증가:', { productId: product.product_id, product_cnt: newProductCnt, total_cnt: newTotalCnt });
  };

  const handleSave = () => {
    console.log('수량 변경 저장:', { productId: product.product_id, product_cnt, total_cnt });
    // 여기에 PUT 요청을 추가하여 변경된 수량을 서버에 저장하는 로직을 작성할 수 있습니다.
    navigate('/QuantityChangeFinish', { state: { productId: product.product_id, product_cnt, total_cnt } });
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
          {product?.product_nm || '물품 이름 없음'}
        </Typography>

        <Box className="image-placeholder" mt={2}>
          <span role="img" aria-label="placeholder" style={{ fontSize: '100px' }}>
            {product?.icon || '❓'}
          </span>
        </Box>

        <Typography variant="body1" mt={2}>
          현재 수량: {product_cnt} / {total_cnt}
        </Typography>

        <Box className="quantity-controls" mt={2} display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          <Typography variant="h6" component="span" mx={2}>
            {product_cnt}
          </Typography>
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </Box>
        
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
          수량 변경 저장
        </Button>
      </Box>
    </div>
  );
};

export default QuantityChange;
