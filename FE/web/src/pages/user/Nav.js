import React, { useState, useEffect, useContext } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Dropdown, Button } from 'react-bootstrap';
import '../../style/MainPageApp.css';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../../images/profile.png';
import Swal from "sweetalert2";
import Logout from '../Logout'; 
import { getProfile } from '../../api/userget'; 
import { CartContext } from './CartContext';

const UserNav = () => {
    const [userName, setUserName] = useState('');
    const { setCart, setLockerBodyId } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userId = localStorage.getItem('userId'); // localStorage에서 userId 가져오기
                if (userId) {
                    const profileData = await getProfile(userId); // API 호출로 프로필 데이터 가져오기
                    setUserName(profileData.user_nm); // 가져온 데이터에서 user_nm 설정
                    localStorage.setItem('userName', profileData.user_nm); // userName을 localStorage에 저장
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserName();
    }, []);


    const handleLogout = async () => {
        await Logout(setCart, setLockerBodyId, navigate);    
    };

    return (
        <div>
            <nav className="navbar-custom">
                <Nav className="navbar-left">
                    <Nav.Link href="/web/mainpage">
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


