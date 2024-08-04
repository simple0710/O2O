import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RegisterBroken.css';
import { Button } from 'react-bootstrap';
import { FaCut, FaTint, FaPencilAlt, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  '가위': <FaCut className="icon" />,
  '잉크': <FaTint className="icon" />,
  '연필': <FaPencilAlt className="icon" />,
  '카메라': <FaCamera className="icon" />,
};

function RegisterBroken() {
  const location = useLocation();
  const { reportedItems } = location.state || { reportedItems: [] };
  const navigate = useNavigate();
  
  const brokenlocker = () => {
    navigate('/BrokenLocker');
  };

  return (
    <div className='frame-container'>
      <button className="btn-main" onClick={() => navigate('/')}>
          메인 페이지
      </button>
      <div className="report-container">
        {reportedItems.map(item => (
          <div key={item.id} className="item">
            {iconMap[item.name]}
            <div className="item-description">{item.name}</div>
            <div className="item-status-container">
              {item.broken > 0 && (
                <div className="item-status">
                  <span className="status-label">파손 :</span>
                  <span className="item-count">{item.broken}</span>
                </div>
              )}
              {item.missing > 0 && (
                <div className="item-status">
                  <span className="status-label">분실 :</span>
                  <span className="item-count">{item.missing}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="register-button-container">
          <Button variant="primary" className="register-button" onClick={brokenlocker}>등록</Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterBroken;
