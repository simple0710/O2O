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


const PrivateRoute = ({ element }) => {
    const isAuthenticated = Boolean(localStorage.getItem('accessToken'));
    return isAuthenticated ? element : <Navigate to="/" />;
};

const AdminRoute = ({ element }) => {
    const isAuthenticated = Boolean(localStorage.getItem('accessToken'));
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    return isAuthenticated && isAdmin ? element : <Navigate to="/mainpage" />;
};

const UserRoute = ({ element }) => {
    const isAuthenticated = Boolean(localStorage.getItem('accessToken'));
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    return isAuthenticated && !isAdmin ? element : <Navigate to="/admin" />;
};

function App() {
    return (
        <CartProvider>
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Login />} />
                <Route path='/findpwd' element={<Findpwd />} />
                <Route path='/logout' element={<Logout />} />

                {/* Admin Routes */}
                <Route path='/admin' element={<AdminRoute element={<AdminMainpage />} />} />
                <Route path='/admin/complain' element={<AdminRoute element={<Complain />} />} />
                <Route path='/admin/request' element={<AdminRoute element={<Request />} />} />
                <Route path='/admin/statics' element={<AdminRoute element={<Statistics />} />} />
                <Route path='/admin/userlist' element={<AdminRoute element={<UserList />} />} />
                <Route path='/admin/changepwd' element={<AdminRoute element={<AdminChangePwd />} />} />
                <Route path='/admin/adduser' element={<AdminRoute element={<AddUser />} />} />
                <Route path='/admin/additem' element={<AdminRoute element={<AddItem />} />} />
                <Route path='/admin/profile' element={<AdminRoute element={<AdminProfile />} />} />

                {/* User Routes */}
                <Route path='/mainpage' element={<UserRoute element={<MainPage />} />} />
                <Route path='/changepwd' element={<UserRoute element={<ChangePwd />} />} />
                <Route path='/request/article' element={<UserRoute element={<RequestItem />} />} />
                <Route path='/item/reservation' element={<UserRoute element={<ReservationList />} />} />
                <Route path='/item/notrefund' element={<UserRoute element={<NotRefund />} />} />
                <Route path='/profile' element={<UserRoute element={<UserProfile />} />} />
            </Routes>
        </CartProvider>
    );
}

export default App;
