import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

const getUserRole = () => {
    return localStorage.getItem('isAdmin'); // 관리자인 경우 'true', 사용자인 경우 'false'
};

const RedirectIfAuthenticated = ({ children }) => {
    if (isAuthenticated()) {
        const role = getUserRole();
        if (role === 'true') {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/mainpage" />;
        }
    }
    return children;
};

export default RedirectIfAuthenticated;