import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Dropdown, Button } from 'react-bootstrap';
import '../../style/MainPageApp.css';
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import Swal from "sweetalert2";
import {Logout} from '../Logout';  

const UserNav = () => {
    const [userName, setUserName] = useState('');

    useEffect(()=>{
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName);
    }, []);


    const handleLogout = async () => {
        await Logout();    
    };

    return (
        <div>
            <nav className="navbar-custom">
                <Nav className="navbar-left">
                    <Nav.Link href="/mainpage">
                        O<span className="highlight">2</span>O
                    </Nav.Link>
                </Nav>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
                        <img src={Profile} alt="프로필사진" style={{ width: "40px" }} />
                        {userName} 님
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">
                            프로필 수정
                        </Dropdown.Item>
                        {/* <Dropdown.Item as={Link} to="/changepwd">
                            비밀번호 수정
                        </Dropdown.Item> */}
                        <Dropdown.Item onClick={handleLogout}>
                            로그아웃
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
        </div>

    );


};

export default UserNav;
