import React, { useState } from 'react';
import '../../style/AdminMainpage.css'; 
import { Button, Form, InputGroup } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import axios from 'axios';
import '../../style/AddUser.css';
import axiosInstance from '../../utils/axiosInstance'


function AddUser() {
    const [formData, setFormData] = useState({
        user_lgid: '',
        user_pw: '',
        user_nm: '',
        emp_cd: '',
        user_img: '',
        user_tel: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/users/regist', formData);
            console.log(response.data);
            alert('회원가입 성공');
        } catch (err) {
            console.log(err);
            alert('회원가입 실패');
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="content-container">
                <Sidebar />
                <div className="content">
                    <h2>이용자 등록</h2>
                    <div className='user-form'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>로그인아이디(이메일형식):</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="user_lgid"
                                    value={formData.user_lgid}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>비밀번호:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="user_pw"
                                    value={formData.user_pw}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>사용자명:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_nm"
                                    value={formData.user_nm}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formImageLink">
                                <Form.Label>이미지링크:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_img"
                                    value={formData.user_img}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                등록
                            </Button>
                        </Form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddUser;