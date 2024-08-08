import React, { useState } from 'react';
import '../../style/AddItem.css';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import axiosInstance from '../../utils/axiosInstance';

function AddItem() {
    const [itemData, setItemData] = useState({
        itemName: '',
        itemDescription: '',
        itemImage: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setItemData({
            ...itemData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const productsDto = {
            product_nm: itemData.itemName,
            product_det: itemData.itemDescription,
            user_id: 7
        };

        formData.append('products', new Blob([JSON.stringify(productsDto)], { type: 'application/json' }));

        if (itemData.itemImage) {
            formData.append('files', itemData.itemImage);
        }

        try {
            const response = await axiosInstance.post('/products/regist', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server Response: ', response.data);

            // 입력 필드 초기화
            setItemData({
                itemName: '',
                itemDescription: '',
                itemImage: null
            });
        } catch (error) {
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
                                    onChange={handleChange}
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
