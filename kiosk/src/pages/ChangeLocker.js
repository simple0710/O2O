import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChangeLocker.css';

const ChangeLocker = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  };

  const quantity1 = () => {
    navigate('/QuantityChange')
  }

  return (
    <div className='frame-container'>
    <div className="locker-container">
      <button className="btn btn-primary btn-sm mr-2 back-button" onClick={back}>뒤로가기</button>
      <div className="locker-header">
        수량을 변경할 사물함을<br /> 선택해주세요 <br /> <br />
      </div>
      
      <div className="locker highlight" style={{ top: '40%' }} />
      <div className="locker" style={{ top: '20%', left: '25%', backgroundColor: 'blue' }} onClick={quantity1}/>
      <div className="locker" style={{ top: '20%', left: '50%' }} />
      <div className="locker" style={{ top: '20%', left: '75%' }} />
      <div className="locker" style={{ top: '60%', left: '25%' }} />
      <div className="locker" style={{ top: '60%', left: '50%' }} />
      <div className="locker" style={{ top: '60%', left: '75%' }} />
      <div className="locker" style={{ top: '40%', left: '25%' }} />
      <div className="locker" style={{ top: '40%', left: '75%' }} />
    </div>
    </div>
  );
};

export default ChangeLocker;
