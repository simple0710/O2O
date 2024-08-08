import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Identification/Identification.css';
import '../styles/common/Common.css';
import { Button } from 'bootstrap';
import { Loading } from '../components/common/loading.js';
import { getNameFromImage, checkName } from '../api/identification.js'
import { saveObjectToSession } from '../util/sessionUtils.js'
import Swal from 'sweetalert2';

function Identification() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const service = location.state?.label;  // label 정보를 service에 저장

  // -----------------------
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 상태
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  // 인식 결과
  const [result, setResult] = useState({
    name: "",
    score: 0,
    isAdmin: false
  })

  useEffect(() => {
    console.log(service);
  }, [service]);

  useEffect(() => {
    // getVideo();
    // autoChecker();
  }, [navigate, service]);

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


  function goRoute() {
    // 버튼 별로 다른 경로로 이동하도록
    if (service === '대여') {
      navigate('/cart2', { state: { service } });
    } else if (service === '반납') {
      navigate('/returnlist', { state: { service } });
    } else if (service === '관리자') {
      navigate('/serviceselection', { state: { service } });
    } else if (service === '신고') {
      navigate('/brokenfind', { state: { service } });
    } else {
      // 기본 경로 설정 (예: 홈으로 이동)
      navigate('/', { state: { service } });
    }
  }

  function autoChecker () {
     // 10초 후에 각 조건에 따라 다른 경로로 이동
     const timer = setTimeout(() => {
      goRoute();
    }, 1000);

    return () => clearTimeout(timer);  // 컴포넌트 언마운트 시 타이머 클리어
  }

  

  const getImage = async () => {
    // alert("클릭");
    if(!loading){
      setLoadingMsg("분석 중 …");
      setLoading(true);
      const data = await getData();
      const res = handleData(data);
      setLoading(false);
      
    } 
  }

  const getData = async () => {
    const data = await getNameFromImage();
    console.log('data: ', data);
    return data;
  }

  const handleData = (data) => {
    if(data && data.flag){
      console.log(data.result)
      const res = {
        text: data.result.text,
        score: data.result.score,
        isAdmin: data.result.isAdmin? data.result.isAdmin:false
      };
      setResult(res);
      checkUser(res);
    } else {
      handleError("이름 인식에 실패했습니다. 다시 촬영해주세요.");
      checkUser({
        text: "최지은",
        score: 0.8,
        isAdmin: false
      }); // 나중에 삭제!!!
    }
  }

  const checkUser = async (result) => {
    console.log(result);
    const msg = `'${result.text}'님이 맞습니까?`;
    if(window.confirm(msg)){
      setLoading(true);
      setLoadingMsg("확인 중 …");
      const params = {
        // name: result.text
        name: "최지은"
      };
      const response = await checkName(params);
      if(response != null && response.active){
        saveObjectToSession("user", response);
        Swal.fire({
          title: '인증 성공',
          text: `${response.user_nm}님, 안녕하세요.`,
          // icon: 'info',
          timer: 3000, // 3초
          timerProgressBar: true, 
      });
        setLoading(false);
        goRoute();
      } else {
        handleError("적합하지 않은 사용자입니다. 다시 촬영을 시도해주세요.")
      }

    }
  }

  const handleError = (msg) => {
    window.alert(msg? msg:"오류가 발생했습니다. 다시 시도해주세요.");
  }

  return (
   
      <div className="identification-container">
        <div className="text-box">
          <p className='mb-0'>사원증을 인식해 주세요.</p>
          <p className='small-font'>지정된 위치에 사원증을 놓은 후 촬영 버튼을 눌러주세요.</p>
        </div>
        <div className="video-container">
          {/* <video ref={videoRef} autoPlay playsInline /> */}
          { loading? 
                <Loading
                  msg = {loadingMsg}
                />
                : null
          }
        </div>
        <div>
          <button className='button1' onClick={getImage} disabled={loading}>촬영</button>
        </div>
      </div>

  );
}

export default Identification;




