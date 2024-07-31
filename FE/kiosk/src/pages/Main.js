import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import styles from './styles/mainpage/Frame.module.css';
import Logo from './components/mainpage/Logo';
import Instruction from './components/mainpage/Instruction';
import Button from './components/mainpage/Button';
import Identification from './pages/Identification';
import Finish from './pages/Finish'
import { FiAlertCircle  } from "react-icons/fi";


function Frame() {


  const navigate = useNavigate();

  const handleButtonClick = (label) => {
    navigate('/identification', { state: { label } });
  };

  return (
  <>
    <div>
      <Link to="/finish">Go to Finish Page</Link>
      </div>

    <div className={styles['frame-container']}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.instruction}>
        <Instruction />
      </div>
      <div className={styles['button-grid']}>
        <Button icon={FiAlertCircle } label="대여" onClick={() => handleButtonClick('대여')} />
        <Button icon={FiAlertCircle } label="관리자" onClick={() => handleButtonClick('관리자')} />
        <Button icon={FiAlertCircle } label="반납" onClick={() => handleButtonClick('반납')} />
        <Button icon={FiAlertCircle } label="신고" onClick={() => handleButtonClick('신고')} />
      </div>
    </div>

      </>

  );
}

export default Frame;