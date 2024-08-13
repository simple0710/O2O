import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://i11d101.p.ssafy.io:8000",
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        console.log('tk', token)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://i11d101.p.ssafy.io:8000/users/token/refresh', { refreshToken });
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (err) {
                console.log(err);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
