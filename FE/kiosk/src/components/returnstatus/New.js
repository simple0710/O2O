import React from 'react';
import { putReturnItem } from '../../api/brokenfind.js';

const RentDataSender = () => {
    const rentData = {
      rent_id: 14,
      products: [
        {
          product_id: 13,
          product_cnt: 3,
          locker_id: 4,
          status_id: 2, // 반납:2
        },
        {
          product_id: 24,
          product_cnt: 1,
          locker_id: 3,
          status_id: 2,
        },
      ],
    };
  
    const sendRentData = async () => {
      try {
        const response = await putReturnItem(rentData);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div>
        <button onClick={sendRentData}>반납</button>
      </div>
    );
  };
  
  export default RentDataSender;
