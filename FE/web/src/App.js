import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import './App.css';
import ReservationList from './pages/user/ReservationList';
import NotRefund from './pages/user/NotRefund';
import AdminRoute from './components/AdminRoute'; // AdminRoute 컴포넌트 import
import UserRoute from './components/UserRoute'; // UserRoute 컴포넌트 import
import { Navigate } from 'react-router-dom';
import RedirectIfAuthenticated from './components/AuthenticRoute';

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
                <Route path='/' element={
                    <RedirectIfAuthenticated>
                        <Login />
                    </RedirectIfAuthenticated>
                } />
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
                
                {/* 관리자 페이지 */}
                <Route path='/admin' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminMainpage />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/complain' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <Complain />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/request' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <Request />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/statics' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <Statistics />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/userlist' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <UserList />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/changepwd' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminChangePwd />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/adduser' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AddUser />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/additem' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AddItem />
                        </AdminRoute>
                    </ProtectedRoute>
                } />
                <Route path='/admin/profile' element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminProfile />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                {/* 사용자 페이지 */}
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
                <Route path='/profile' element={
                    <ProtectedRoute>
                        <UserRoute pageUserId={localStorage.getItem('userId')}>
                            <UserProfile />
                        </UserRoute>
                    </ProtectedRoute>
                } />
            </Routes>
        </CartProvider>
    );
}

export default App;
