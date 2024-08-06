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
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile(7);
        setProfileData(data);
        setFormData(data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(7, formData); 
      setProfileData(formData);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Nav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h2>프로필</h2>
          {editMode ? (
            <div className="edit-form">
              <label>
                사용자명:
                <input
                  type="text"
                  name="user_nm"
                  value={formData.user_nm}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                전화번호:
                <input
                  type="text"
                  name="user_tel"
                  value={formData.user_tel}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                프로필 이미지:
                <input
                  type="text"
                  name="user_img"
                  value={formData.user_img}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button onClick={handleSave}>저장</button>
              <button onClick={() => setEditMode(false)}>취소</button>
            </div>
          ) : (
            <div className="profile-info">
              <p><img src={Image} alt="프로필 이미지" /></p>
              <p>사용자명: {profileData.user_nm}</p>
              {/* <p>직원 번호: {profileData.emp_cd}</p> */}
              <p>전화번호: {profileData.user_tel}</p>
              {/* <p>관리자 여부: {profileData._admin ? '예' : '아니오'}</p> */}
              {/* <p>프로필 이미지: <img src={profileData.user_img} alt="프로필 이미지" /></p> */}
              
              <button className="edit-button" onClick={() => setEditMode(true)}>수정</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
