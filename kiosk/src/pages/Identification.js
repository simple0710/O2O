import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Identification/Identification.css';


function Identification() {
  const location = useLocation();
  // 클릭 버튼 정보 = label
  const { label } = location.state || {};

  const videoRef = useRef(null);

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
  }, []);

  return (
   
      <div className="identification-container">
        <div className="text-box">
          <p>사원증을 인식해 주세요.</p>
          {/* {label && <p>버튼 정보: {label}</p>} */}
        </div>
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline />
        </div>
      </div>

  );
}

export default Identification;
