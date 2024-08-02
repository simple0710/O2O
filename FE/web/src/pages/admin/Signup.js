import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    userLgid: '',
    userPw: '',
    userNm: '',
    empCd: '',
    userImg: '',
    userTel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/users/regist', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
    <h2>이용자 등록</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userLgid">아이디</label>
        <input
          type="text"
          id="userLgid"
          name="userLgid"
          value={formData.userLgid}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userPw">비밀번호</label>
        <input
          type="password"
          id="userPw"
          name="userPw"
          value={formData.userPw}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="empCd">직원번호</label>
        <input
          type="text"
          id="empCd"
          name="empCd"
          value={formData.empCd}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userImg">이미지</label>
        <input
          type="text"
          id="userImg"
          name="userImg"
          value={formData.userImg}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userTel">전화번호</label>
        <input
          type="text"
          id="userTel"
          name="userTel"
          value={formData.userTel}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;
