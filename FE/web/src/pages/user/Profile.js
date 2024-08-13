import React, { useState, useEffect } from 'react';
import { getProfile } from '../../api/userget'; 
import { updateProfile } from '../../api/userpost'; 
import '../../style/Profile.css';
import Sidebar from './Sidebar';
import Nav from './Nav';
import Image from '../../images/profile.png';
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
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setPasswordRequired(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_pw: ''
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
              <img
                // src={formData.user_img ? URL.createObjectURL(formData.user_img) : Image}
                src={Image}
                alt="프로필 이미지"
              />
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
                  <table className="profile-table">
                    <tbody>
                      <tr>
                        <td className="detail-label"><strong>이름</strong></td>
                        <td className="detail-value">
                          <input
                            type="text"
                            name="user_nm"
                            value={formData.user_nm}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>전화번호</strong></td>
                        <td className="detail-value">
                          <input
                            type="text"
                            name="user_tel"
                            value={formData.user_tel}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>비밀번호</strong></td>
                        <td className="detail-value">
                          <input
                            type="password"
                            name="user_pw"
                            value={formData.user_pw}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span>
                    <ButtonComponent onClick={handleSave} style={{ margin: '20px 10px' }}>저장</ButtonComponent>
                    <ButtonComponent onClick={() => setEditMode(false)} style={{ margin: '20px 10px' }}>취소</ButtonComponent>
                  </span>
                </div>
              ) : (
                <div className='profile-content'>
                  <table className="profile-table">
                    <tbody>
                      <tr>
                        <td className="detail-label"><strong>이름</strong></td>
                        <td className="detail-value">{profileData.user_nm}</td>
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>전화번호</strong></td>
                        <td className="detail-value">{profileData.user_tel}</td>
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>비밀번호</strong></td>
                        <td className="detail-value">********</td>
                      </tr>
                    </tbody>
                  </table>
                  <ButtonComponent onClick={handleEdit} style={{ margin: '30px 0px' }}>수정</ButtonComponent>
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
