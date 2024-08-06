import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; 
import Sidebar from './Sidebar';
import Nav from './Nav';
import { getProfile } from '../../api/userget'; 

function Profile() {
  const [profileData, setProfileData] = useState({
    user_nm: "",
    emp_cd:"",
    user_tel:"",
    _admin:"",
    user_img:"",
  });

  useEffect(() => {
    console.log("mainpage")
    const fetchProfileData = async () => {
      try {
        console.log("fetchProfileData")
        const data = await getProfile(7);
        console.log(data); 
        setProfileData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileData();
  }, []);


  return (
    <div>
      <Nav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h2>프로필</h2>
          <div>
            <p>사용자명: {profileData.user_nm}</p>
            <p>직원 번호: {profileData.emp_cd}</p>
            <p>전화번호: {profileData.user_tel}</p>
            <p>관리자 여부: {profileData._admin ? '예' : '아니오'}</p>
            <p>프로필 이미지: <img src={profileData.user_img} alt="프로필 이미지" /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
