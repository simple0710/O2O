import React, { useState, useEffect } from 'react';
import '../../style/AdminMainpage.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import { getProfile } from '../../api/userget'; 
import { updateProfile } from '../../api/userpost'; 
import '../../style/Profile.css';
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
  };

  const handleSave = async () => {
    try {
      
      const userId = localStorage.getItem('userId');
      await updateProfile(userId, formData);
      setProfileData(formData);
      console.log(formData)
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div>
      <AdminNav />
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
                  <p>
                    <strong>비밀번호:</strong>
                    <input
                      type="password"
                      name="user_pw"
                      // value={formData.user_pw}
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
