import axiosInstance from '../utils/axiosInstance'

export async function getReservation(pgNo, perPage, userId){
    try{
        const params = {pg_no: pgNo, per_page: perPage , userId: userId }
        const response = await axiosInstance.get(`/reserve/view`, {params:params}, {
            headers : {
                "Content-Type" : "application/json"
            }
        });
        const data = await response.data.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}