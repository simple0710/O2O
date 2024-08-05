import React, { useState } from "react";
import Logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
    const [formData, setFormData] = useState({
        user_lgid: '',
        user_pw: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post('/users/login', formData);
            
            const accessToken = response.data.accessToken;
            // 사용자 ID 추출(수정필요)
            const userId = response.data.data[0].user[0].user_id; 
            localStorage.setItem('accessToken', accessToken);
            // 사용자 ID 저장(수정필요)
            localStorage.setItem('userId', userId); 

            console.log('로그인 성공:', response.data);
            console.log(accessToken);
            
            navigate('/mainpage');
        } catch (err) {
            console.error(err);
            alert('존재하지 않는 아이디 or 비밀번호 입니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleFindPwdClick = () => {
        navigate('/findpwd');
    };

    return (
        <div className="login-container">
            <img src={Logo} alt="로고" />
            <p style={{ fontWeight: 'bold' }}>Log In to O2O</p>
            <p style={{ fontSize: '15px', color: 'gray' }}>Enter your id and password below</p>
            <div className="login-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="inputId">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="user_lgid"
                            placeholder="Enter your id"
                            value={formData.user_lgid}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="inputPassword">
                        <Form.Label>PASSWORD</Form.Label>
                        <Form.Control
                            type="password"
                            name="user_pw"
                            placeholder="Enter your password"
                            value={formData.user_pw}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <Button variant="dark" className="login-button" style={{ marginTop: '10px' }} type="submit" disabled={loading}>
                        {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Log In'}
                    </Button>
                    <br />
                    <Button className="login-button" onClick={handleFindPwdClick}>비밀번호 찾기</Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
