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
import {Logout} from './pages/Logout';
import RequestItem from './pages/user/RequestItem';
import { CartProvider } from './pages/user/CartContext';
import './App.css';
import ReservationList from './pages/user/ReservationList';
import NotRefund from './pages/user/NotRefund';

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
    return (
        <CartProvider>
            <Routes>
                
                <Route path='/' element={<Login />} />
                <Route path='/findpwd' element={<Findpwd />} />
                <Route path='/logout' element={<Logout />} />
                
                {/* 인증된 사용자 */}
                <Route path='/mainpage' element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />
                <Route path='/changepwd' element={
                    <ProtectedRoute>
                        <ChangePwd />
                    </ProtectedRoute>
                } />
                <Route path='/admin' element={
                    <ProtectedRoute>
                        <AdminMainpage />
                    </ProtectedRoute>
                } />
                <Route path='/admin/complain' element={
                    <ProtectedRoute>
                        <Complain />
                    </ProtectedRoute>
                } />
                <Route path='/admin/request' element={
                    <ProtectedRoute>
                        <Request />
                    </ProtectedRoute>
                } />
                <Route path='/admin/statics' element={
                    <ProtectedRoute>
                        <Statistics />
                    </ProtectedRoute>
                } />
                <Route path='/admin/userlist' element={
                    <ProtectedRoute>
                        <UserList />
                    </ProtectedRoute>
                } />
                <Route path='/admin/changepwd' element={
                    <ProtectedRoute>
                        <AdminChangePwd />
                    </ProtectedRoute>
                } />
                <Route path='/admin/adduser' element={
                    <ProtectedRoute>
                        <AddUser />
                    </ProtectedRoute>
                } />
                <Route path='/admin/additem' element={
                    <ProtectedRoute>
                        <AddItem />
                    </ProtectedRoute>
                } />

                 <Route path='/request/article' element={
                    <ProtectedRoute>
                        <RequestItem />
                    </ProtectedRoute>
                } />

                 <Route path='/item/reservation' element={
                    <ProtectedRoute>
                        <ReservationList />
                    </ProtectedRoute>
                } />

                 <Route path='/item/notrefund' element={
                    <ProtectedRoute>
                        <NotRefund />
                    </ProtectedRoute>
                } />
                
            </Routes>
        </CartProvider>
    );
}

export default App;
