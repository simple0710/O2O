import React from "react";
import Logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import '../Login.css';

const Login = () => {
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
                {/* <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: '8px' }}
                /> */}
                    Log In
                </Button><br></br>
                <Button variant="dark" className="login-button">비밀번호 찾기</Button>
            </div>
        </div>
    );
}

export default Login;
