import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Dropdown, Button } from 'react-bootstrap';
import '../../style/MainPageApp.css';
import { Link } from 'react-router-dom';
import Profile from '../../images/profile.png';
import Modals from "./Modals";
import Swal from "sweetalert2";
import {Logout} from '../Logout';  

const UserNav = () => {
    const [show, setShow] = useState(false);
    const [modalCloseConfirmed, setModalCloseConfirmed] = useState(false);
    const [userName, setUserName] = useState('');

    const handleShow = () => {
        setShow(true);
        document.body.style.overflow = "hidden"; // 모달 팝업시 배경 움직이지 않도록
    };

    const handleClose = (confirmed) => {
        setShow(false);
        document.body.style.overflow = "hidden";
        if (confirmed) {
            setModalCloseConfirmed(true);
        }
    };

    const handleLogout = async () => {
        await Logout();    
    };

    useEffect(() => {
        if (modalCloseConfirmed) {
            Swal.fire({
                title: "요청이 접수되었습니다.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
            setModalCloseConfirmed(false);
        }
    }, [modalCloseConfirmed]);

    return (
        <div>
            <nav className="navbar-custom">
                <Nav className="navbar-left">
                    <Nav.Link href="/mainpage">
                        O<span className="highlight">2</span>O
                    </Nav.Link>
                </Nav>
                <div className="text-center">
                    {" "}
                    <Button className='request-button' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleShow}>
                        요청
                    </Button>
                </div>
                <Modals show={show} handleClose={handleClose} />
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
                        <img src={Profile} alt="프로필사진" style={{ width: "40px" }} />
                        홍길동 님
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">
                            프로필 수정
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/changepwd">
                            비밀번호 수정
                        </Dropdown.Item>
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
