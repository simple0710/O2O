import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminRoute = ({ children }) => {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

    if (!isAdmin) {
        Swal.fire({
            title: '접근 불가',
            text: '관리자 권한이 필요합니다.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인'
        }).then(() => {
            window.location.href = '/'; // 로그인 페이지로 리디렉션
        });
        return null; // 렌더링하지 않음
    }

    return children;
};

export default AdminRoute;
