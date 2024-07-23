import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Locker.css';

const Locker = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  };

  const borrowfinish  = () => {
    navigate('/BorrowFinish')
  }

  return (
    <div className='frame-container'>
    <div className="locker-container">
      <button className="btn btn-primary btn-sm mr-2 back-button" onClick={back}>뒤로가기</button>
      <div className="locker-header">
        표시된 사물함에서<br /> 물건을 가져가세요<br /> <br />
      </div>
      
      <div className="locker highlight" style={{ top: '40%' }} />
      <div className="locker" style={{ top: '20%', left: '25%' }} />
      <div className="locker" style={{ top: '20%', left: '50%', backgroundColor: 'red' }} onClick={borrowfinish}/>
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

export default Locker;
