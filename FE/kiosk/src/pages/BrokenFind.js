import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';

const items = [
  { id: 1, name: '가위', icon: '✂️' },
  { id: 2, name: '잉크', icon: '🖋️' },
  { id: 3, name: '연필', icon: '✏️' },
  { id: 4, name: '카메라', icon: '📷' },
];

function BrokenFind() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(items.reduce((acc, item) => {
    acc[item.id] = { broken: 0, missing: 0 };
    return acc;
  }, {}));

  const increaseQuantity = (id, type) => {
    setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] + 1 } }));
  };

  const decreaseQuantity = (id, type) => {
    setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] > 0 ? prev[id][type] - 1 : 0 } }));
  };

  const reportItems = () => {
    const reportedItems = items.map(item => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      broken: quantities[item.id].broken,
      missing: quantities[item.id].missing
    })).filter(item => item.broken > 0 || item.missing > 0);

    console.log("신고된 아이템:", reportedItems);
    // console.log(reportedItems[0].name)
    navigate('/registerbroken', { state: { reportedItems } });
  };

  return (
    <div className='frame-container'>
    <div className="cart-container">
      <h2>대여물품조회</h2>
      <div className="items">
        {items.map(item => (
          <div key={item.id} className="item">
            <div className="item-header">
              <span className="item-icon">{item.icon}</span>
              <span className="item-name">{item.name}</span>
            </div>
            <div className="item-controls">
            <div className="control">
              <span className="preserve-horizontal-text">파손</span>
              <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(item.id, 'broken')}>-</button>
              <span className="mx-1">{quantities[item.id].broken}</span>
              <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(item.id, 'broken')}>+</button>
            </div>
            <div className="control">
              <span className="preserve-horizontal-text">분실</span>
              <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(item.id, 'missing')}>-</button>
              <span className="mx-1">{quantities[item.id].missing}</span>
              <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(item.id, 'missing')}>+</button>
            </div>
            </div>
          </div>
        ))}
      </div>
      <button className="report-button" onClick={reportItems}>신고하기</button>
    </div>
    </div>
  );
}

export default BrokenFind;
