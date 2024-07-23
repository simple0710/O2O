import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Identification/Identification.css';


function Identification() {
  const location = useLocation();
  // 클릭 버튼 정보 = label
  const { label } = location.state || {};

  const videoRef = useRef(null);
  // console.log(props.label)

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
          {label && <p>버튼 정보: {label}</p>}
        </div>
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline />
        </div>
      </div>

  );
}

export default Identification;




// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Identification/Identification.css';

// function Identification() {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // 비디오 스트림을 설정하는 함수
//     async function getVideo() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Error accessing the webcam: ", err);
//       }
//     }

//     getVideo();

//     // 5초 후에 페이지 이동
//     const timer = setTimeout(() => {
//       navigate('/finish'); // 이동할 페이지 경로
//     }, 5000); // 5000ms = 5초

//     // 컴포넌트 언마운트 시 타이머 정리
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="identification-container">
//       <div className="text-box">
//         <p>사원증을 인식해 주세요.</p>
//       </div>
//       <div className="video-container">
//         <video ref={videoRef} autoPlay playsInline />
//       </div>
//     </div>
//   );
// }

// export default Identification;
