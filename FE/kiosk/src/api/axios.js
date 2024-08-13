import axios from "axios";

export const axiosSpring = axios.create({
    baseURL: "http://i11d101.p.ssafy.io:8000",
    headers: {
        'Content-Type': 'application/json',
    },
});

// 이후 프록시 설정 
export const axiosFast = axios.create({
    baseURL: "http://192.168.100.218:8000",
    headers: {
        'Content-Type': 'application/json',
    },
});
