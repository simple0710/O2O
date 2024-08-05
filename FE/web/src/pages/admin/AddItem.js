import React, {useState} from 'react';
import '../../style/AddItem.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import { Button, Form } from "react-bootstrap";
import axios from 'axios'
import axiosInstance from '../../utils/axiosInstance'

function AddItem() {
    const [itemData, setItemData] = useState({
        itemName: '',
        itemDescription: '',
        itemImage: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setItemData({
            ...itemData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            product_nm: itemData.itemName,
            product_det : itemData.itemDescription,
            user_id: 5
        }

        try {
            const response = await axiosInstance.post('/products/regist', payload ,{
                headers :{
                    'Content-Type' : 'application/json '
                }
            });
        console.log('Server Response: ', response.data);
        } catch(error){
            console.log('Error submitting data: ', error);
        }
    };

  return (
    <div>
      <AdminNav />
      <div className="content-container">
          <Sidebar />
          <div className="content">
            <h2>물품 추가</h2>
            <div className='item-form'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="itemName" className="form-label">물품명:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="itemName"
                        name="itemName"
                        value={itemData.itemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="itemDescription" className="form-label">물품설명:</label>
                    <textarea
                        className="form-control"
                        id="itemDescription"
                        name="itemDescription"
                        value={itemData.itemDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="itemImage" className="form-label">물품사진:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="itemImage"
                        name="itemImage"
                        value={itemData.itemImage}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="add-btn">등록</button>
            </form>
            </div>
          </div>
      </div>
    
    </div>
  );
}

export default AddItem;








