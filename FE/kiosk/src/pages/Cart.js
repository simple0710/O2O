import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart.css';

const items = [
  { id: 1, name: '가위', icon: '✂️' },
  { id: 2, name: '잉크', icon: '🖋️' },
  { id: 3, name: '연필', icon: '✏️' },
  { id: 4, name: '카메라', icon: '📷' },
];

function Cart() {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState(items.reduce((acc, item) => {
    acc[item.id] = 0;
    return acc;
  }, {}));

  const increaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 }));
  };

  const cartItems = items.filter(item => quantities[item.id] > 0);

  const logCartItems = () => {
    console.log("장바구니 아이템:", cartItems.map(item => ({
      name: item.name,
      quantity: quantities[item.id]
    })));
    navigate('/locker');
  };

  return (
    <div className='frame-container'>
      <div>
        <header className="text-center mb-4">
          <h1>물품 리스트</h1>
        </header>
        <div className="item-list mb-4">
          {items.map(item => (
            <div key={item.id} className="item card mb-4">
              <div className="card-body d-flex align-items-center">
                <div className="item-icon mr-3">{item.icon}</div>
                <div className="item-name flex-grow-1">{item.name}</div>
                <div className="item-controls d-flex align-items-center">
                  <button className="btn btn-primary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{quantities[item.id]}</span>
                  <button className="btn btn-primary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer className="footer">
          <div className="cart mb-4">
            <h2 className="h5">장바구니</h2>
            {cartItems.length === 0 ? (
              <p>장바구니가 비어 있습니다.</p>
            ) : (
              <ul className="list-group">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.icon} {item.name}
                    <span className="badge badge-white badge-pill">{quantities[item.id]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="btn btn-primary btn-block" onClick={logCartItems}>대여</button>
        </footer>
      </div>
    </div>
  );
}

export default Cart;
