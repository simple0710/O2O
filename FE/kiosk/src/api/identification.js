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
        const response = await axiosSpring.post(`/kiosk/users/emp-check`, params, {
            headers : {
                "Content-Type": "multipart/form-data"

            }
        }); 
        // const response = {
        //     data: { 
        //         "status" : 200,
        //         "message" : "인증을 완료했습니다.",
        //         "data": 
        //             {
        //                     "user_id": 4,
        //                     "active": true,
        //             }
                
        //     }
        // }
        const data = await response.data.data;
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}


