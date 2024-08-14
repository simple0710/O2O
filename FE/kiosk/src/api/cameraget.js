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



export async function open(params){
    try {
        console.log('Sending Data:', params)
        const response = await axiosSpring.post(`http://192.168.100.218:8000/open/`, params);
        return response;
    } catch (e) {
        console.error(e);
        return null;
    }

}




export async function register(params){
    try {
        console.log('Sending Data:', params)
        const response = await axiosSpring.post(`http://192.168.100.218:8000/reg/`, params);
        return response;
    } catch (e) {
        console.error(e);
        return null;
    }

}




