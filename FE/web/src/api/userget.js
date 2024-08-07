import axios from 'axios';
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


export async function getRent(pgNO, perPage, userId){
    try{
        const params = {pg_no: pgNO, per_page: perPage, userId:userId}
        const response = await axiosInstance.get(`/rent/current`, {params}, {
            headers : {
                "Content-Type" : "application/json"
            }
        });
        const data = await response.data.data.rents;
        return data;
    } catch(e){
        console.error(e)
    }
}


export async function getRecent(pgNo, perPage, userId){
    try{
        const params = {pg_no: pgNo, per_page: perPage, userId:userId}
        const response = await axiosInstance.get(`/rent/history`, {params}, {
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const data = await response.data.data.rents;  
        return data;
    } catch (e) {
        console.error(e)
    }
}

export async function getProfile(userId) {
  try {
    const response = await axiosInstance.get(`/users/profile/${userId}`);
    // console.log(response)
    return response.data;
  } catch (e) {
    console.error(e);
    throw e; 
  }
}