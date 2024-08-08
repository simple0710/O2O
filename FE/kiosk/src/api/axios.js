import axios from "axios";

export const axiosSpring = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// 이후 프록시 설정 
export const axiosFast = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json',
    },
});