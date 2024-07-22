import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './pages/Cart'; // 장바구니 컴포넌트
import Locker from './pages/Locker'; // 사물함 컴포넌트
import ChooseLocker from './pages/ChooseLocker';
import ItemRegistration from './pages/ItemRegistration';
import ServiceSelection from './pages/ServiceSelection';
import QuantityChange from './pages/QuantityChange';
import BrokenFind from './pages/BrokenFind';
import styles from './styles/mainpage/Frame.module.css';
import image6 from './assets/mainpage/image 6.png';
import image8 from './assets/mainpage/image 8.png';
import image7 from './assets/mainpage/image 7.png';
import image9 from './assets/mainpage/image 9.png';
import Logo from './components/mainpage/Logo';
import Instruction from './components/mainpage/Instruction';
import Button from './components/mainpage/Button';
import Identification from './pages/Identification';
import RegisterBroken from './pages/RegisteBroken';
import Finish from './pages/Finish';
import ReturnStatus from './pages/ReturnStatus';


function Frame() {
  const navigate = useNavigate();

  const handleButtonClick = (label) => {
    navigate('/identification', { state: { label } });
  };

  return (
  <>
    
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
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">My App</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/locker">Locker</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chooselocker">Choose Locker</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/serviceselection">ServiceSelection</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/itemregistration">ItemRegistration</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/quantitychange">QuantityChange</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/brokenfind">BrokenFind</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/finish">Go to Finish Page</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/registerbroken">RegisteBroken</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/returnstatus">Return Status</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Frame />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/finish" element={<Finish />} />
          <Route path="/cart" element={<Cart />} /> {/* 기본 경로로 Cart 컴포넌트를 렌더링합니다. */}
          <Route path="/locker" element={<Locker />} /> {/* /locker 경로로 Locker 컴포넌트를 렌더링합니다. */}
          <Route path="/chooselocker" element={<ChooseLocker />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/itemregistration" element={<ItemRegistration />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/serviceselection" element={<ServiceSelection />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/quantitychange" element={<QuantityChange />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/brokenfind" element={<BrokenFind />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/registerbroken" element={<RegisterBroken />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/returnstatus" element={<ReturnStatus />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}

        </Routes>
      </div>
      {/* <Routes>
        <Route path="/" element={<Frame />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/finish" element={<Finish />} />
      </Routes> */}
    </Router>
  );
}

export default App;
