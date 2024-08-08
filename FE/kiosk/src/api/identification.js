import { axiosFast, axiosSpring } from "./axios";

export async function getNameFromImage(){
    try {
        // const response = await axiosFast.get(`/get-image/static`); // 테스트용
        const response = await axiosFast.get(`/get-image`);
        const data = await response.data;
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}


export async function checkName(params){
    try {
        const response = await axiosSpring.post(`/users/emp-check`, params); 
        // const response = {
        //     data: { 
        //         "status" : 200,
        //         "message" : "인증을 완료했습니다.",
        //         "data": [
        //             {
        //                     "is_valid": true,
        //                     "message": "사원 ㅇㅇㅇ입니다." // "존재하지 않는 사원입니다"
        //             }
        //         ]
        //     }
        // }
        const data = await response.data.data;
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

