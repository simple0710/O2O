import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';
import styles from './styles/mainpage/Frame.module.css';
import image6 from './assets/mainpage/image 6.png';
import image8 from './assets/mainpage/image 8.png';
import image7 from './assets/mainpage/image 7.png';
import image9 from './assets/mainpage/image 9.png';
import Logo from './components/mainpage/Logo';
import Instruction from './components/mainpage/Instruction';
import Button from './components/mainpage/Button';
import Identification from './pages/Identification';
import Finish from './pages/Finish'

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
        <Button icon={image6} label="대여" onClick={() => handleButtonClick('대여')} />
        <Button icon={image8} label="관리자" onClick={() => handleButtonClick('관리자')} />
        <Button icon={image7} label="반납" onClick={() => handleButtonClick('반납')} />
        <Button icon={image9} label="신고" onClick={() => handleButtonClick('신고')} />
      </div>
    </div>

      </>

  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frame />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </Router>
  );
}

export default App;
