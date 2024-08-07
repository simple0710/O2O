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

  const [editField, setEditField] = useState(null);
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

  const handleSave = async (field) => {
    try {
      const updatedData = { ...profileData, [field]: formData[field] };
      const userId = localStorage.getItem('userId');
      await updateProfile(userId, updatedData);
      setProfileData(updatedData);
      setEditField(null);
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
          <div className="profile-card">
            <div className="profile-field">
              <img src={profileData.user_img || Image} alt="프로필 이미지" />
              {editField === 'user_img' ? (
                <div>
                  <input
                    type="text"
                    name="user_img"
                    value={formData.user_img}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSave('user_img')}>저장</button>
                  <button 
                    className="cancel-button"
                    onClick={() => setEditField(null)}
                  >취소</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => setEditField('user_img')}>수정</button>
                </div>
              )}
            </div>
            <table className="profile-table">
              <tbody>
                <tr>
                  <td>이름</td>
                  <td>
                    <span>
                      {editField === 'user_nm' ? (
                        <div>
                          <input
                            type="text"
                            name="user_nm"
                            value={formData.user_nm}
                            onChange={handleInputChange}
                          />
                          <button onClick={() => handleSave('user_nm')}>저장</button>
                          <button 
                            className="cancel-button"
                            onClick={() => setEditField(null)}
                          >취소</button>
                        </div>
                      ) : (
                        <div>
                          <span>{profileData.user_nm}</span>
                          <button onClick={() => setEditField('user_nm')}>수정</button>
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>전화번호</td>
                  <td>
                    {editField === 'user_tel' ? (
                      <div>
                        <input
                          type="text"
                          name="user_tel"
                          value={formData.user_tel}
                          onChange={handleInputChange}
                        />
                        <button onClick={() => handleSave('user_tel')}>저장</button>
                        <button 
                          className="cancel-button"
                          onClick={() => setEditField(null)}
                        >취소</button>
                      </div>
                    ) : (
                      <div>
                        <span>{profileData.user_tel}</span>
                        <button onClick={() => setEditField('user_tel')}>수정</button>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
