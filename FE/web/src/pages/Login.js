import React, { useState } from "react";
import Logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        userLgid: '',
        userPw: '',
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
            const response = await axios.post('http://localhost:8080/api/login', formData);
            console.log('Login successful:', response.data);
            navigate('/dashboard'); // 로그인 성공 시 리디렉션
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials');
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
                            name="userLgid"
                            placeholder="Enter your id"
                            value={formData.userLgid}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="inputPassword">
                        <Form.Label>PASSWORD</Form.Label>
                        <Form.Control
                            type="password"
                            name="userPw"
                            placeholder="Enter your password"
                            value={formData.userPw}
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
