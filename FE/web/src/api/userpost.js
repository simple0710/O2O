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