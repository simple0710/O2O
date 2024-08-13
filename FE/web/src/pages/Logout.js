import axiosInstance from '../utils/axiosInstance';

export const Logout = async (setCart, setLockerBodyId, navigate) => {
    try {
        // 서버에 로그아웃 요청 보내기
        await axiosInstance.post('/users/logout');

        // 로그아웃 요청이 성공하면 로컬 스토리지에서 토큰과 상태 정보를 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('cart');
        localStorage.removeItem('lockerBodyId');

        // 상태 초기화
        setCart([]);
        setLockerBodyId(null);

    } catch (error) {
        // 로그아웃 요청이 실패하더라도 상태를 초기화하고 로그인 페이지로 이동
        console.error('Logout failed:', error);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('cart');
        localStorage.removeItem('lockerBodyId');

        setCart([]);
        setLockerBodyId(null);
    } finally {
        // 상태 초기화 후 로그인 페이지로 리다이렉트
        navigate('/');
    }
};
