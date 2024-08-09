import React, { useState } from 'react';
import '../../style/AdminMainpage.css'; 
import { Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import Swal from 'sweetalert2';
import '../../style/AddUser.css';
import axiosInstance from '../../utils/axiosInstance';
import ButtonComponent from '../../components/ButtonComponent';


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
    //전화번호
    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
        return phoneRegex.test(phoneNumber);
    };
    //비밀번호 특수문자
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{6,}$/;
        return passwordRegex.test(password);
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

        if (!validatePassword(formData.user_pw)) {
            Swal.fire({
                title: '비밀번호 형식 오류',
                text: '비밀번호는 6자 이상, 특수문자를 포함해야 하며, 공백을 포함할 수 없습니다.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '확인'
            });
            return;
        }

        const formDataToSend = new FormData();
        
        const membersDto = {
            user_lgid: formData.user_lgid,
            user_pw: formData.user_pw,
            user_nm: formData.user_nm,
            emp_cd: formData.emp_cd,
            user_tel: formData.user_tel
        };

        
        formDataToSend.append('members', new Blob([JSON.stringify(membersDto)], { type: 'application/json' }));

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
                            <ButtonComponent 
                            type="submit"
                            >
                                등록
                            </ButtonComponent>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;

