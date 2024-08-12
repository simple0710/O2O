import React, { useState, useEffect } from 'react';
import '../../style/AdminMainpage.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import { getProfile } from '../../api/userget'; 
import { updateProfile } from '../../api/userpost'; 
import '../../style/Profile.css';
import Image from '../../images/th.jpeg';
import ButtonComponent from '../../components/ButtonComponent';

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
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        user_img: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

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
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h2>프로필</h2>
          <div className="profile-card">
            <div className="profile-image">
              <div>
              <img
                src={formData.user_img ? URL.createObjectURL(formData.user_img) : Image}
                alt="프로필 이미지"
              />
              </div>
              {editMode && (
                <input
                  type="file"
                  name="user_img"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div className="profile-details">
              {editMode ? (
                <div className='profile-edit'>
                  <p>
                  <strong>이름</strong>
                    <input
                      type="text"
                      name="user_nm"
                      value={formData.user_nm}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                  <strong>전화번호</strong>
                    <input
                      type="text"
                      name="user_tel"
                      value={formData.user_tel}
                      onChange={handleInputChange}
                    />
                  </p>
                  {/* 비밀번호 필수 입력 */}
                  <p>
                  <strong>비밀번호</strong>
                    <input
                      type="password"
                      name="user_pw"
                      value={formData.user_pw}  
                      onChange={handleInputChange}
                    />
                  </p>
                  <span>
                  <ButtonComponent onClick={handleSave} style={{margin: '20px 10px' }}>저장</ButtonComponent>
                  <ButtonComponent onClick={() => setEditMode(false)} style={{ margin: '20px 10px' }}>취소</ButtonComponent>
                  </span>
                </div>
              ) : (
                <div className='profile-content'>
                  <p>
                    <div className="detail-label"><strong>이름</strong></div>
                    <div className="detail-value">{profileData.user_nm}</div>
                  </p>
                  <p>
                    <div className="detail-label"><strong>전화번호</strong></div>
                    <div className="detail-value">{profileData.user_tel}</div>
                  </p>
                  <p>
                    <div className="detail-label"><strong>비밀번호</strong></div>
                    <div className="detail-value">********</div>
                  </p>
                  <ButtonComponent onClick={handleEdit} style={{ margin: '30px 0' }}>수정</ButtonComponent>
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
