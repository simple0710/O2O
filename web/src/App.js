import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import MainPage from './pages/user/MainPage';
import Login from './pages/Login';
import Findpwd from './pages/Findpwd';
import Cart from './pages/user/Cart';
import Locker from './pages/user/Locker';
import ChangePwd from './pages/ChangePwd';
import './App.css';



function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/findpwd' element={<Findpwd />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/locker' element={<Locker />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/changepwd' element={<ChangePwd />} />
        </Routes>

    </div>
  );
}

export default App;
