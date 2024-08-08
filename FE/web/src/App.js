import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import AddItem from './pages/admin/AddItem';
import AddUser from './pages/admin/AddUser';
import { Logout } from './pages/Logout';
import RequestItem from './pages/user/RequestItem';
import AdminProfile from './pages/admin/Profile';
import UserProfile from './pages/user/Profile';
import { CartProvider } from './pages/user/CartContext';
import ReservationList from './pages/user/ReservationList';
import NotRefund from './pages/user/NotRefund';

function App() {
    return (
        <CartProvider>
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Login />} />
                <Route path='/findpwd' element={<Findpwd />} />
                <Route path='/logout' element={<Logout />} />

                {/* Admin Routes */}
                <Route path='/admin' element={<AdminMainpage />} />
                <Route path='/admin/complain' element={<Complain />} />
                <Route path='/admin/request' element={<Request />} />
                <Route path='/admin/statics' element={<Statistics />} />
                <Route path='/admin/userlist' element={<UserList />} />
                <Route path='/admin/changepwd' element={<AdminChangePwd />} />
                <Route path='/admin/adduser' element={<AddUser />} />
                <Route path='/admin/additem' element={<AddItem />} />
                <Route path='/admin/profile' element={<AdminProfile />} />

                {/* User Routes */}
                <Route path='/mainpage' element={<MainPage />} />
                <Route path='/changepwd' element={<ChangePwd />} />
                <Route path='/request/article' element={<RequestItem />} />
                <Route path='/item/reservation' element={<ReservationList />} />
                <Route path='/item/notrefund' element={<NotRefund />} />
                <Route path='/profile' element={<UserProfile />} />
            </Routes>
        </CartProvider>
    );
}

export default App;
