import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './components/Cart'; // 장바구니 컴포넌트
import Locker from './components/Locker'; // 사물함 컴포넌트
import ChooseLocker from './components/ChooseLocker';
import ItemRegistration from './components/ItemRegistration';
import ServiceSelection from './components/ServiceSelection';
import QuantityChange from './components/QuantityChange';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">My App</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Cart</Link>
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
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Cart />} /> {/* 기본 경로로 Cart 컴포넌트를 렌더링합니다. */}
          <Route path="/locker" element={<Locker />} /> {/* /locker 경로로 Locker 컴포넌트를 렌더링합니다. */}
          <Route path="/chooselocker" element={<ChooseLocker />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/itemregistration" element={<ItemRegistration />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/serviceselection" element={<ServiceSelection />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
          <Route path="/quantitychange" element={<QuantityChange />} /> {/* /chooselocker 경로로 ChooseLocker 컴포넌트를 렌더링합니다. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
