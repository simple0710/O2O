import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosSpring } from '../api/axios';
import '../styles/QuantityChange.css';
import { getProductIcon } from '../util/productUtil.js'; // getProductIcon 함수 임포트

const QuantityChange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [changeCnt, setChangeCnt] = useState(0); // 증가/감소량을 0으로 시작
  const [product_cnt, setProductCnt] = useState(product?.product_cnt || 0);
  const [total_cnt, setTotalCnt] = useState(product?.total_cnt || 0);

  useEffect(() => {
    if (product) {
      setProductCnt(product.product_cnt);
      setTotalCnt(product.total_cnt);
    }
  }, [product]);

  const handleDecrease = () => {
    if (changeCnt > -product.product_cnt) {
      setChangeCnt(changeCnt - 1);
    }
  };

  const handleIncrease = () => {
    setChangeCnt(changeCnt + 1);
  };

  const handleSave = () => {
    const newProductCnt = product_cnt + changeCnt;
    const newTotalCnt = total_cnt + changeCnt;

    const updatedProduct = {
      locker_id: product.locker_id, // 추가된 locker_id
      product_id: product.product_id,
      product_cnt: newProductCnt,
      total_cnt: newTotalCnt,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    axiosSpring
      .put(`/kiosk/lockers/locker`, updatedProduct, { headers })
      .then((response) => {
        console.log('수량 저장 성공:', response.data);
        navigate('/QuantityChangeFinish', {
          state: {
            productId: product.product_id,
            product_cnt: newProductCnt,
            total_cnt: newTotalCnt,
          },
        });
      })
      .catch((error) => {
        console.error('수량 저장 실패:', error);
        // 실패했을 때 전송하려던 데이터와 헤더를 출력
        console.log('전송하려던 데이터:', updatedProduct);
        console.log('사용된 헤더:', headers);
      });
  };

  return (
    <div className='frame-container'>
      <div>
        <button className="btn-main" onClick={() => navigate('/')}>
          HOME
        </button>
      </div>
      <Box className="container1">
        <Typography variant="h5" component="h2" gutterBottom>
          {product?.product_nm || '물품 이름 없음'}
        </Typography>

        <Box className="image-placeholder" mt={2}>
          <span role="img" aria-label="placeholder" style={{ fontSize: '100px' }}>
            {getProductIcon(product?.product_id) || '❓'}
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
            {changeCnt} {/* 증가/감소량 표시, 초기값은 0 */}
          </Typography>
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </Box>

        <Button id="btn-change" className='btn-change' variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
          수량 변경 저장
        </Button>
      </Box>
    </div>
  );
};

export default QuantityChange;
