import React from "react";
import Logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleFindPwdClick = () => {
        navigate('/findpwd');
    };

    return (
        <div className="login-container">
            <img src={Logo} alt="로고" />
            <p style={{fontWeight:'bold'}}>Log In to O2O</p>
            <p style={{fontSize:'15px', color:'gray'}}>Enter your id and password below</p>
            <div className="login-form">
                <Form.Label htmlFor="inputId">ID</Form.Label>
                <Form.Control
                    type="id"
                    id="inputId"
                    placeholder="Enter your id"
                />
                <Form.Label htmlFor="inputPassword">PASSWORD</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword"
                    placeholder="Enter your password"
                />
                <Button variant="dark" className="login-button" style={{marginTop:'10px'}}>
                    Log In
                </Button><br></br>
                <Button className="login-button" onClick={handleFindPwdClick}>비밀번호 찾기</Button>
            </div>
        </div>
    );
}

export default Login;
