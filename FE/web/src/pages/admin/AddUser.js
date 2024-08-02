import React, { useState } from 'react';
import '../../style/AdminMainpage.css'; 
import { Button, Form, InputGroup } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import '../../style/AddUser.css';

function AddUser() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        employeeId: '',
        imageLink: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div>
        <AdminNav />
        <div className="content-container">
            <Sidebar />
            <div className="content">
                <h2>이용자 등록</h2>
                <div className='user-form'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="form-label">로그인아이디(이메일형식):</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='이메일 형식으로 입력해주세요.'
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label">비밀번호:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='특수문자를 포함해서 입력해주세요.'
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="form-label">사용자명:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder='성함을 입력해주세요.'
                        />
                    </div>
                    <div>
                        <label htmlFor="employeeId" className="form-label">직원번호:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employeeId"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                            placeholder='직원번호를 입력해주세요.'
                        />
                    </div>
                    <div>
                        <label htmlFor="imageLink" className="form-label">이미지링크:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imageLink"
                            name="imageLink"
                            value={formData.imageLink}
                            onChange={handleChange}
                            required
                            placeholder='사원증 사진을 넣어 주세요.'
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="form-label">전화번호:</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            placeholder='전화번호를 입력해주세요.'
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

export default AddUser;
