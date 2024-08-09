import { useEffect } from 'react';

const useLogoutOnClose = () => {
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('accessToken');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
};

export default useLogoutOnClose;
