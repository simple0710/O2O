import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type' : 'application/json',
    },
});


export async function postRegisterItem(params){
    try{
        const response = await axiosInstance.post(`/lockers/registerNew`, params)
        console.log("Status updated successfully")
    } catch(e) {
        console.error(e)
    }
}

