import React, { useState, useRef } from 'react';
import '../../style/AddItem.css'; 
import { Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import axiosInstance from '../../utils/axiosInstance';
import ButtonComponent from '../../components/ButtonComponent';

function AddItem() {
    const userId = localStorage.getItem('userId');
    const [itemData, setItemData] = useState({
        itemName: '',
        itemDescription: '',
        itemImage: null
    });

    // 이미지 파일 input의 ref 생성
    const fileInputRef = useRef(null);

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
            user_id: userId
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

            // 이미지 파일 input 초기화
            if (fileInputRef.current) {
                fileInputRef.current.value = '';  // 이 부분에서 파일 input을 초기화
            }
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formItemName">
                                <Form.Label>물품명</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="itemName"
                                    placeholder="물품명을 입력해주세요."
                                    value={itemData.itemName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formItemDescription">
                                <Form.Label>물품설명</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="itemDescription"
                                    placeholder="물품 설명을 입력해주세요."
                                    value={itemData.itemDescription}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formItemImage">
                                <Form.Label>물품 이미지</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="itemImage"
                                    onChange={handleChange}
                                    ref={fileInputRef}
                                />
                            </Form.Group>

                            <ButtonComponent 
                                type="submit"
                                style={{ marginTop: '20px' }}
                            >
                                등록
                            </ButtonComponent>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddItem;
