import axios from "axios";

const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

export async function getCurrentProducts(userId, pgNo, perPage){
    try {
        // ?pg_no=1&per_page=10 
        // params 분리 
        const params = { pg_no: pgNo, per_page: perPage, userId: userId };
        const response = await axiosInstance.get(`/rent/current`, { params: params});
        const data = await response.data.data;
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function postProductsBrokenAndMissing(params){
    try {
        const response = await axiosInstance.post(`/products/report`, params[0]);
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function putReturnItem(){
    try {
        const response = await axiosInstance.put(`/rent`);
        console.log(response)
        // return response
    } catch (err) {
        console.log(err);
    }
}


