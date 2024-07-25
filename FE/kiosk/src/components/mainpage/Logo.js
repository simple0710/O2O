import React from "react";
import '../../styles/mainpage/Logo.css';
import logo from "../../assets/mainpage/로고-removebg-preview 1.png"; // 이미지 import

function Logo() {
  return (
    <div className='image'>
    <img className='logo' alt="" src={logo} />
    </div>
  );
}

export default Logo;


