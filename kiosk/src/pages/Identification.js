import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Identification/Identification.css';


function Identification() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const service = location.state?.label;  // label 정보를 service에 저장

  useEffect(() => {
    console.log(service);
  }, [service]);


  useEffect(() => {
    async function getVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the webcam: ", err);
      }
    }
    getVideo();




    // 버튼 별로 다른 경로로 이동하도록
     // 10초 후에 각 조건에 따라 다른 경로로 이동
     const timer = setTimeout(() => {
      if (service === '대여') {
        navigate('/cart', { state: { service } });
      } else if (service === '반납') {
        navigate('/returnstatus', { state: { service } });
      } else if (service === '관리자') {
        navigate('/serviceselection', { state: { service } });
      } else if (service === '신고') {
        navigate('/brokenfind', { state: { service } });
      } else {
        // 기본 경로 설정 (예: 홈으로 이동)
        navigate('/', { state: { service } });
      }
    }, 1000);

    return () => clearTimeout(timer);  // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate, service]);


  return (
   
      <div className="identification-container">
        <div className="text-box">
          <p>사원증을 인식해 주세요.</p>
        </div>
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline />
        </div>
      </div>

  );
}

export default Identification;




