import { axiosSpring } from "./axios";

// export async function getTest(){
//     try {
//         const response = await axiosSpring.get(`http://192.168.100.218:8000/test`);
//         return response;
//     } catch (e) {
//         console.error(e);
//         return null;
//     }
// }

export async function getTest(){
    try {
        const response = await axiosSpring.get(`http://192.168.100.218:8000/delete/`);
        return response;
    } catch (e) {
        console.error(e);
        return null;
    }
}




////// brokenfind.js에 api, get 코드 임시 저장