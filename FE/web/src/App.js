import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import MainPage from './pages/user/MainPage';
import Login from './pages/Login';
import Findpwd from './pages/Findpwd';
import ChangePwd from './pages/user/ChangePwd';
import AdminMainpage from './pages/admin/AdminMainpage';
import Complain from './pages/admin/Complain';
import Request from './pages/admin/Request';
import Statistics from './pages/admin/Statistics';
import UserList from './pages/admin/UserList';
import AdminChangePwd from './pages/admin/AdminChangePwd';
import { CartProvider } from './pages/user/CartContext';
import './App.css';



function App() {
  return (
    <div className="App">
        <CartProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/findpwd' element={<Findpwd />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/changepwd' element={<ChangePwd />} />
          <Route path='/admin' element={<AdminMainpage />} />
          <Route path='/admin/complain' element={<Complain />} />
          <Route path='/admin/request' element={<Request />} />
          <Route path='/admin/statics' element={<Statistics />} />
          <Route path='/admin/userlist' element={<UserList />} />
          <Route path='/admin/changepwd' element={<AdminChangePwd />} />
        </Routes>
        </CartProvider>
        
    </div>
  );
}

export default App;
