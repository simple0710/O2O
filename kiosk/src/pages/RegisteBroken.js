import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RegisterBroken.css';
import { Button } from 'react-bootstrap';
import { FaCut, FaTint, FaPencilAlt, FaCamera } from 'react-icons/fa';

const iconMap = {
  '가위': <FaCut className="icon" />,
  '잉크': <FaTint className="icon" />,
  '연필': <FaPencilAlt className="icon" />,
  '카메라': <FaCamera className="icon" />,
};

function RegisterBroken() {
  const location = useLocation();
  const { reportedItems } = location.state || { reportedItems: [] };

  return (
    <div className="report-container">
      {reportedItems.map(item => (
        <div key={item.id} className="item">
          {iconMap[item.name]}
          <div className="item-description">{item.name}</div>
          {item.broken > 0 && (
            <div className="item-status">
              <span className="item-count">{item.broken}</span>
              <Button variant="outline-primary" className="status-button">파손</Button>
            </div>
          )}
          {item.missing > 0 && (
            <div className="item-status">
              <span className="item-count">{item.missing}</span>
              <Button variant="outline-primary" className="status-button">분실</Button>
            </div>
          )}
        </div>
      ))}
      <div className="register-button-container">
        <Button variant="primary" className="register-button">등록</Button>
      </div>
    </div>
  );
}

export default RegisterBroken;
