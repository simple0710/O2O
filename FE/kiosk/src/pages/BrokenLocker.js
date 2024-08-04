import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BrokenLocker.css';

const Locker = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate('/Locker');
  };

  const brokenfinish = () => {
    navigate('/BrokenFinish')
  }

  return (
    <div className='frame-container'>
    <div className="locker-container">
    <button className="btn-main" onClick={() => navigate('/')}>메인 페이지</button>
      <div className="locker-header">
        표시된 파손함에<br /> 파손 물품을 넣어주세요 <br /> <br />
      </div>
      
      <div className="locker highlight" style={{ top: '40%' }} />
      <div className="locker" style={{ top: '20%', left: '25%'}} />
      <div className="locker" style={{ top: '20%', left: '50%' }} />
      <div className="locker" style={{ top: '20%', left: '75%' }} />
      <div className="locker" style={{ top: '60%', left: '25%' }} />
      <div className="locker" style={{ top: '60%', left: '50%' }} />
      <div className="locker" style={{ top: '60%', left: '75%' , backgroundColor: 'pink'  }} onClick={brokenfinish}/>
      <div className="locker" style={{ top: '40%', left: '25%' }} />
      <div className="locker" style={{ top: '40%', left: '75%', }} />
    </div>
    </div>
  );
};

export default Locker;
