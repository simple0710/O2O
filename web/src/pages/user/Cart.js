import React from 'react';
import '../../Cart.css';

const Cart = () => {
  return (
    <div className='outer-box'>
      <p>장바구니</p>
      <div className="cart-buttons">
        <button className="cart-button">예약하기</button>
        <button className="cart-button cancel">취소</button>
      </div>
    </div>
  );
};

export default Cart;
