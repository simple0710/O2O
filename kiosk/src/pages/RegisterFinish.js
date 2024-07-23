import React, { useEffect } from 'react';
import Checkmark from '../components/finish/Checkmark';
import RegisterInst from '../components/finish/RegisterInst';
import '../styles/finish/finish.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Finish() {
  const navigate = useNavigate();
  const location = useLocation();
  const { service } = location.state || {}; // 서비스 상태를 location에서 가져옵니다.

  useEffect(() => {
    // 타이머를 설정하여 1초 후에 페이지를 이동합니다.
    const timer = setTimeout(() => {
      navigate('/', { state: { service } });
    }, 4000); // 4초 후 이동

    // 컴포넌트 언마운트 시 타이머를 클리어
    return () => clearTimeout(timer);
  }, [navigate, service]); // navigate와 service를 의존성 배열에 추가

  return (
    <div className='frame-container'>
      <div className='instruction'>
        <RegisterInst />
      </div>
      <div>
        <Checkmark />
      </div>
    </div>
  );
}

export default Finish;
