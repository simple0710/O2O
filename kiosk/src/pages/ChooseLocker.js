import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Locker.css';

const Locker = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate('/Locker');
  };

  return (
    <div className="locker-container">
      <button className="btn btn-primary btn-sm mr-2 back-button" onClick={back}>뒤로가기</button>
      <div className="locker-header">
        빈 사물함을<br /> 선택 해주세요<br /> <br />
      </div>
      
      <div className="locker highlight" style={{ top: '40%' }} />
      <div className="locker" style={{ top: '20%', left: '25%' }} />
      <div className="locker" style={{ top: '20%', left: '50%' }} />
      <div className="locker" style={{ top: '20%', left: '75%' }} />
      <div className="locker" style={{ top: '60%', left: '25%' }} />
      <div className="locker" style={{ top: '60%', left: '50%' }} />
      <div className="locker" style={{ top: '60%', left: '75%' }} />
      <div className="locker" style={{ top: '40%', left: '25%' }} />
      <div className="locker" style={{ top: '40%', left: '75%' }} />
    </div>
  );
};

export default Locker;
