import React, { useState } from 'react';
import '../../style/AdminMainpage.css'; 
import { Button, Form, InputGroup } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import axios from "axios";


const Signup = () => {
    const [formData, setFormData] = useState({
      user_lgid: '',
      user_pw: '',
      user_mm: '',
      emp_cd: '',
      user_img: '',
      user_tel: '',
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
      <AdminNav />
      <div className="content-container">
          <Sidebar />
          <div className="content">
          <div>
      <h2>이용자 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userLgid">아이디</label>
          <input
            type="text"
            id="userLgid"
            name="userLgid"
            value={formData.user_lgid}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userPw">비밀번호</label>
          <input
            type="password"
            id="userPw"
            name="userPw"
            value={formData.user_pw}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="empCd">직원번호</label>
          <input
            type="text"
            id="empCd"
            name="empCd"
            value={formData.emp_cd}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userImg">이미지</label>
          <input
            type="text"
            id="userImg"
            name="userImg"
            value={formData.user_img}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userTel">전화번호</label>
          <input
            type="text"
            id="userTel"
            name="userTel"
            value={formData.user_tel}
            onChange={handleChange}
          />
        </div>
        <button type="submit">등록</button>
      </form>
      </div>
          </div>
      </div>
    
    </div>
    );
  };
  
  export default Signup;
// function AddUser() {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         username: '',
//         employeeId: '',
//         imageLink: '',
//         phoneNumber: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData);
//     };

//     return (
//         <div>
//         <AdminNav />
//         <div className="content-container">
//             <Sidebar />
//             <div className="content">
//                 <h2>이용자 등록</h2>
//                 <div className='user-form'>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="email" className="form-label">로그인아이디(이메일형식):</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="form-label">비밀번호:</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="username" className="form-label">사용자명:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="username"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="employeeId" className="form-label">직원번호:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="employeeId"
//                             name="employeeId"
//                             value={formData.employeeId}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="imageLink" className="form-label">이미지링크:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="imageLink"
//                             name="imageLink"
//                             value={formData.imageLink}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="phoneNumber" className="form-label">전화번호:</label>
//                         <input
//                             type="tel"
//                             className="form-control"
//                             id="phoneNumber"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="add-btn">등록</button>
//                 </form>
//                 </div>
//             </div>
//         </div>
        
//         </div>
//   );
// }

// export default AddUser;
