import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Nav from './Nav'; 
import Sidebar from './Sidebar';
import { updateProfile } from '../../api/userpost'; 

function ChangePwd() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    setError('');

    // 비밀번호 검증
    if (newPassword !== confirmNewPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!newPassword) {
      setError('새 비밀번호를 입력해 주세요.');
      return;
    }

    setLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      const profileData = {
        new_pw: newPassword,
      };

      // updateProfile 함수 호출
      const response = await updateProfile(userId, profileData);

      if (response && response.success) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/'); 
      } else {
        console.log(response)
        setError(response || '비밀번호 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h1>비밀번호 변경</h1>
          <div className="pwd-form">
            <Form.Group controlId="inputNewPassword1">
              <Form.Label>새 비밀번호 입력</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력해 주세요."
              />
            </Form.Group>
            <Form.Group controlId="inputNewPassword2">
              <Form.Label>새 비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="새 비밀번호를 다시 입력해 주세요."
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button
              className="pwd-button"
              onClick={handlePasswordChange}
              disabled={loading}
            >
              {loading ? '변경 중...' : '비밀번호 수정'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePwd;