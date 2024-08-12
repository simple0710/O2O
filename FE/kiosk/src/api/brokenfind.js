import { axiosSpring } from "./axios";

export async function getCurrentProducts(userId, pgNo, perPage){
    try {
        // ?pg_no=1&per_page=10 
        // params 분리 
       
        const params = { pg_no: pgNo, per_page: perPage, userId: userId };
        console.log(params)
        const response = await axiosSpring.get(`/rent/current`, { params: params});
        const data = await response.data.data;
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function postProductsBrokenAndMissing(params){
    try {
        const response = await axiosSpring.post(`/products/report`, params[0]);
    } catch (e) {
        console.error(e);
        return null;
    }
}



export async function getTest(){
    try {
        const response = await axiosSpring.get(`http://192.168.100.218:8000/delete/`);
        return response;
    } catch (e) {
        console.error(e);
        return null;
    }
}



