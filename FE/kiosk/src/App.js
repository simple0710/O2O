import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './pages/Cart'; // 장바구니 컴포넌트
import Cart2 from './pages/Cart2' // 새로운 카트
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
import BorrowFinish from './pages/BorrowFinish';
import ReturnStatus from './pages/ReturnStatus';
import ChangeLocker from './pages/ChangeLocker';
import ReturnFinish from './pages/ReturnFinish';
import BrokenFinish from './pages/BrokenFinish';
import QuantityChangeFinish from './pages/QuantityChangeFinish';
import RegisterFinish from './pages/RegisterFinish';
import ReturnList from './pages/ReturnList';
import ReturnLocker from './pages/ReturnLocker';
import { FiAlertTriangle, FiArchive, FiCornerDownRight ,FiSettings    } from "react-icons/fi";
import BrokenLocker from './pages/BrokenLocker'
import Reservation from './pages/Reservation';



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
        <Button icon={FiArchive } label="대여" onClick={() => handleButtonClick('대여')} />
        <Button icon={FiCornerDownRight   } label="반납" onClick={() => handleButtonClick('반납')} />        
        <Button icon={FiAlertTriangle  } label="신고" onClick={() => handleButtonClick('신고')} />
        <Button icon={FiSettings   } label="관리자" onClick={() => handleButtonClick('관리자')} />
      </div>
    </div>

      </>

  );
}

function App() {
  return (
    <Router>
      <div>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <li className="nav-item">
                <Link className="nav-link" to="/changelocker">Change Locker</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brokenlocker">Broken Locker</Link>
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
                <Link className='nav-link' to="/borrowfinish">Borrow Finish</Link>
              </li>


              <li className='nav-item'>
                <Link className='nav-link' to="/returnfinish">Return Finish</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/brokenfinish">Broken Finish</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/quantitychangefinish">QuantityChange Finish</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/registerfinish">Register Finish</Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to="/registerbroken">RegisteBroken</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/returnstatus">Return Status</Link>
              </li>
            </ul>
          </div>
        </nav> */}

        <Routes>
          <Route path="/" element={<Frame />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/borrowfinish" element={<BorrowFinish />} />
          <Route path="/cart" element={<Cart />} /> {/* 기본 경로로 Cart 컴포넌트를 렌더링합니다. */}
          <Route path="/cart2" element={<Cart2 />} /> {/* 기본 경로로 Cart 컴포넌트를 렌더링합니다. */}
          <Route path="/locker" element={<Locker />} /> {/* /locker 경로로 Locker 컴포넌트를 렌더링합니다. */}
          <Route path="/chooselocker" element={<ChooseLocker />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/itemregistration" element={<ItemRegistration />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/serviceselection" element={<ServiceSelection />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/quantitychange" element={<QuantityChange />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/brokenfind" element={<BrokenFind />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/registerbroken" element={<RegisterBroken />}/> 
          <Route path="/returnstatus" element={<ReturnStatus />}/> 
          <Route path="/changelocker" element={<ChangeLocker />}/> 
          <Route path="/brokenlocker" element={<BrokenLocker />}/> 
          
          <Route path="/returnlist" element={<ReturnList />}/> 
          <Route path="/returnlocker" element={<ReturnLocker />}/> 

          <Route path="/returnfinish" element={<ReturnFinish />}/> 
          <Route path="/brokenfinish" element={<BrokenFinish />}/> 
          <Route path="/quantitychangefinish" element={<QuantityChangeFinish />}/> 
          <Route path="/registerfinish" element={<RegisterFinish />}/> 
          <Route path="/reservation" element={<Reservation />}/>
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
