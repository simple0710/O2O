import axiosInstance from '../utils/axiosInstance'

export async function postReservation(params){
    try{
        const response = await axiosInstance.post('/reserve', params, {
            headers: {
                "Content-Type" : "application/json"
            }
        });
        console.log("Sataus updated successfully")
    } catch(e){
        console.error(e);
    }
}



export async function postRequest(params){
    try{
        const response = await axiosInstance.post('/products/request', params, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("Satus updated successfully")
    } catch(e){
        console.error(e)
    }
}



export async function deleteReservation(reserveId) {
    try {
        const response = await axiosInstance.delete(`/reserve`, {
            params: {
                reserveId: reserveId
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log('Delete successfully', response.data);
    } catch (e) {
        console.error('Error deleting reservation:', e);
    }
}