import axiosInstance from '../utils/axiosInstance';

// 기본 내보내기 함수 정의
async function Logout(setCart, setLockerBodyId, navigate) {
    try {
        await axiosInstance.post('/users/logout');
        localStorage.removeItem('accessToken');

        // Cart와 lockerBodyId 초기화
        localStorage.removeItem("cart");
        localStorage.removeItem("lockerBodyId");
        setCart([]); // 상태 초기화
        setLockerBodyId(null); // 상태 초기화
        navigate('/'); // 로그아웃 후 리다이렉트
    } catch (error) {
        console.error(error);
    }
}

// 기본 내보내기
export default Logout;
