// import React, { useState } from 'react';
// import '../../style/AdminMainpage.css'; 
// import { Button, Form } from 'react-bootstrap';
// import Sidebar from './Sidebar';
// import AdminNav from './AdminNav';
// import axiosInstance from '../../utils/axiosInstance';
// import '../../style/AddUser.css';

// function AddUser() {
//     const [formData, setFormData] = useState({
//         user_lgid: '',
//         user_pw: '',
//         user_nm: '',
//         emp_cd: '',
//         user_img: null,  // Initial value for file input is null
//         user_tel: ''
//     });

//     const handleChange = (e) => {
//         const { name, value, type, files } = e.target;

//         if (type === 'file') {
//             // Handle file input
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 [name]: files[0]  // Store the file object
//             }));
//         } else {
//             // Handle other inputs
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 [name]: value
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create a FormData object
//         const formDataToSend = new FormData();

//         // Append form data fields to FormData object
//         for (const key in formData) {
//             if (formData[key] !== null && formData[key] !== undefined) {
//                 formDataToSend.append(key, formData[key]);
//             }
//         }

//         // Create productsDto object
//         const productsDto = {
//             user_lgid: formData.user_lgid,
//             user_pw: formData.user_pw,
//             user_nm: formData.user_nm,
//             emp_cd: formData.emp_cd,
//             user_tel: formData.user_tel
//         };

//         // Append productsDto as JSON blob
//         formDataToSend.append('members', new Blob([JSON.stringify(productsDto)], { type: 'application/json' }));

//         try {
//             const response = await axiosInstance.post('/users/regist', formDataToSend, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log(response.data);
//             alert('회원가입 성공');
//         } catch (err) {
//             console.error(err);
//             alert('회원가입 실패');
//         }
//     };

//     return (
//         <div>
//             <AdminNav />
//             <div className="content-container">
//                 <Sidebar />
//                 <div className="content">
//                     <h2>이용자 등록</h2>
//                     <div className='user-form'>
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group className="mb-3" controlId="formEmail">
//                                 <Form.Label>로그인아이디(이메일형식):</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     name="user_lgid"
//                                     value={formData.user_lgid}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formPassword">
//                                 <Form.Label>비밀번호:</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="user_pw"
//                                     value={formData.user_pw}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formUsername">
//                                 <Form.Label>사용자명:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="user_nm"
//                                     value={formData.user_nm}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formEmpCode">
//                                 <Form.Label>직원 코드:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="emp_cd"
//                                     value={formData.emp_cd}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formImageLink">
//                                 <Form.Label>이미지 링크:</Form.Label>
//                                 <Form.Control
//                                     type="file"
//                                     name="user_img"
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formTel">
//                                 <Form.Label>전화번호:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="user_tel"
//                                     value={formData.user_tel}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Button variant="primary" type="submit">
//                                 등록
//                             </Button>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddUser;

import React, { useState } from 'react';
import '../../style/AdminMainpage.css'; 
import { Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import Swal from 'sweetalert2';
import '../../style/AddUser.css';
import axiosInstance from '../../utils/axiosInstance';


function AddUser() {
    const [formData, setFormData] = useState({
        user_lgid: '',
        user_pw: '',
        user_nm: '',
        emp_cd: '',
        user_img: null,
        user_tel: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: files[0]
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number format
        if (!validatePhoneNumber(formData.user_tel)) {
            Swal.fire({
                title: '전화번호 형식 오류',
                text: '올바른 전화번호 형식을 입력해 주세요.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '확인'
            });
            return;
        }


        // Create a FormData object
        const formDataToSend = new FormData();
        
        // Append form data fields to FormData object
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                formDataToSend.append(key, formData[key]);
            }
        }

        // Create productsDto object
        const productsDto = {
            user_lgid: formData.user_lgid,
            user_pw: formData.user_pw,
            user_nm: formData.user_nm,
            emp_cd: formData.emp_cd,
            user_tel: formData.user_tel
        };

        
        formDataToSend.append('members', new Blob([JSON.stringify(productsDto)], { type: 'application/json' }));

        if (formData.user_img) {
            formDataToSend.append('file', formData.user_img);
        }


        try {
            const response = await axiosInstance.post('/users/regist', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
            Swal.fire({
                title: '회원가입 성공',
                text: '회원가입이 완료되었습니다.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '확인'
            });

            // Reset form data after successful submission
            setFormData({
                user_lgid: '',
                user_pw: '',
                user_nm: '',
                emp_cd: '',
                user_img: null,
                user_tel: ''
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                title: '회원가입 실패',
                text: '회원가입에 실패했습니다. 나중에 다시 시도해 주세요.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '확인'
            });
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="content-container">
                <Sidebar />
                <div className="content">
                    <h2>이용자 등록</h2>
                    <div className='user-form'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>로그인아이디(이메일형식):</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="user_lgid"
                                    value={formData.user_lgid}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>비밀번호:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="user_pw"
                                    value={formData.user_pw}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>사용자명:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_nm"
                                    value={formData.user_nm}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmpCode">
                                <Form.Label>직원 코드:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="emp_cd"
                                    value={formData.emp_cd}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formImageLink">
                                <Form.Label>이미지 링크:</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="user_img"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTel">
                                <Form.Label>전화번호:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_tel"
                                    value={formData.user_tel}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                등록
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;

