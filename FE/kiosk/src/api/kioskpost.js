import {axiosSpring} from './axios';



export async function postRegisterItem(params){
    try{
        const response = await axiosSpring.post(`/lockers/registerNew`, params)
        console.log("Status updated successfully")
    } catch(e) {
        console.error(e)
    }
}


export async function putReturn(params) {
    try{
        const response = await axiosSpring.put(`/rent`, params)
        console.log("Status updated successfully")
    } catch (e) {
        console.error(e)
    }
}

