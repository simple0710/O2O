import React, { useState, useEffect } from 'react';
import { getProfile } from '../../api/userget'; 
import { updateProfile } from '../../api/userpost'; 

import '../../style/Profile.css';
import Sidebar from './Sidebar';
import Nav from './Nav';
import Image from '../../images/profile.png';

function Profile() {
  const [profileData, setProfileData] = useState({
    user_nm: "",
    user_tel: "",
    user_img: "",
    user_pw: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [passwordRequired, setPasswordRequired] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const data = await getProfile(userId);
        setProfileData(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Set password required if the user starts typing in any field while in edit mode
    if (editMode && name !== 'user_pw') {
      setPasswordRequired(true);
    }
  };

  const handleSave = async () => {
    if (passwordRequired && !formData.user_pw) {
      alert('비밀번호를 입력하세요.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      await updateProfile(userId, formData);
      setProfileData(formData);
      console.log(formData);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setPasswordRequired(true); // Ensure password is required once edit mode is enabled
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_pw: '' // 비밀번호 입력란을 초기화합니다.
    }));
  };

  return (
    <div>
      <Nav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h2>프로필</h2>
          <div className="profile-card">
            <div className="profile-image">
              <img src={formData.user_img || Image} alt="프로필 이미지" />
              {editMode && (
                <input
                  type="text"
                  name="user_img"
                  value={formData.user_img}
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div className="profile-details">
              {editMode ? (
                <div>
                  <p>
                    <strong>이름:</strong>
                    <input
                      type="text"
                      name="user_nm"
                      value={formData.user_nm}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <strong>전화번호:</strong>
                    <input
                      type="text"
                      name="user_tel"
                      value={formData.user_tel}
                      onChange={handleInputChange}
                    />
                  </p>
                  {/* 비밀번호 필수 입력 */}
                  <p>
                    <strong>비밀번호:</strong>
                    <input
                      type="password"
                      name="user_pw"
                      value={formData.user_pw}  
                      onChange={handleInputChange}
                    />
                  </p>
                  <button onClick={handleSave}>저장</button>
                  <button onClick={() => setEditMode(false)}>취소</button>
                </div>
              ) : (
                <div>
                  <p><strong>이름:</strong> {profileData.user_nm}</p>
                  <p><strong>전화번호:</strong> {profileData.user_tel}</p>
                  <p><strong>비밀번호:</strong> ********</p>
                  <button onClick={handleEdit}>수정</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


