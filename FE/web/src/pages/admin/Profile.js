import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; 
import '../../style/AdminMainpage.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [error] = useState(null);
    const userId = localStorage.getItem('user_id');
  
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await axiosInstance.get(`/users/profile/${userId}`);
          //유저데이터 추출(수정필요)
          const userData = response.data.data[0].user[0]; 
          setProfileData(userData);
        } catch (err) {
          console.error(err);
        } 
      };
  
      fetchProfileData();
    }, []);
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <AdminNav />
        <div className="content-container">
          <Sidebar />
          <div className="content">
            <h2>프로필</h2>
            {profileData && (
              <div>
                <p>사용자명: {profileData.user_nm}</p>
                <p>전화번호: {profileData.user_tel}</p>
                <p>관리자 여부: {profileData.is_admin ? '예' : '아니오'}</p>
                <p>프로필 이미지: <img src={profileData.user_img} alt="프로필 이미지" /></p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default Profile;
