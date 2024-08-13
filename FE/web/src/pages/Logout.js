import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const Logout = async () => {
    try {
        await axiosInstance.post('/users/logout');
        localStorage.removeItem('accessToken');
        window.location.href = '/'; 
    } catch (error) {
        console.error(error);
    }
};

