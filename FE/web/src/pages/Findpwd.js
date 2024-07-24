import React from "react";
import Logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import '../style/Login.css';

const Findpwd = () => {
    return (
        <div className="login-container">
            <img src={Logo} alt="로고" />
            <p style={{fontWeight:'bold'}}>비밀번호 재발급</p>
            <p style={{fontSize:'15px', color:'gray'}}>Enter your id and email below</p>
            <div className="login-form">
                <Form.Label htmlFor="inputId">ID</Form.Label>
                <Form.Control
                    type="id"
                    id="inputId"
                    placeholder="Enter your id"
                />
                <Form.Label htmlFor="inputEmail">PASSWORD</Form.Label>
                <Form.Control
                    type="email"
                    id="inputEmail"
                    placeholder="Enter your email"
                />
                <Button variant="dark" 
                 className="login-button"
                 onClick={()=>alert('이메일이 전송되었습니다.')}
                 >
                    비밀번호 재발급
                </Button>
            </div>
        </div>
    );
}

export default Findpwd;
