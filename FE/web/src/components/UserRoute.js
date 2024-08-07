import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserRoute = ({ children, pageUserId }) => {
    const userId = localStorage.getItem('userId');

    if (userId !== pageUserId) {
        Swal.fire({
            title: '접근 불가',
            text: '본인 페이지에만 접근할 수 있습니다.',
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

export default UserRoute;
