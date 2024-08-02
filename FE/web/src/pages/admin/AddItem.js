import React, {useState} from 'react';
import '../../style/AddItem.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import { Button, Form } from "react-bootstrap";

function AddItem() {
    const [itemData, setItemData] = useState({
        itemName: '',
        itemDescription: '',
        itemImage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Item Data Submitted:', itemData);
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
