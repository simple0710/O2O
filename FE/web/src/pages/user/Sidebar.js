import React, { useContext, useEffect, useState } from 'react';
import { FaComment, FaInfoCircle, FaInbox, FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineImportExport } from 'react-icons/md';
import Calendar from 'react-calendar';
import '../../style/Sidebar.css'; 
import 'react-calendar/dist/Calendar.css'; // Import react-calendar styles
import { CartContext } from './CartContext';

function Sidebar() {
  const { cart, setCart, reservations, setReservations } = useContext(CartContext);
  const [activeDocumentSubmenu, setActiveDocumentSubmenu] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock data for not refunded and recently borrowed items
  const notRefund = [
    { name: "가위", quantity: 4 },
    { name: "풀", quantity: 5 },
  ];

  const recent = [
    { name: "가위", quantity: 4 },
    { name: "잉크", quantity: 5 }
  ];

  // Add item to the cart
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    const existingQuantity = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
    const totalQuantity = existingQuantity + item.quantity;

    if (existingItemIndex >= 0) {
      const updatedCart = cart.map((cartItem, index) =>
        index === existingItemIndex ? { ...cartItem, quantity: totalQuantity } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...item, quantity: totalQuantity }]);
    }
  };

  // Reserve item function, adding to reservations
  const reserveItem = (item) => {
    const newReservation = {
      date: new Date(),
      items: [{ ...item }]
    };

    setReservations(prevReservations => [...prevReservations, newReservation]);
    addToCart(item); // Add the item to the cart as well
  };

  // Format remaining time display
  const formatRemainingTime = (remainingTime) => {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setReservations(prevReservations =>
        prevReservations.map(reservation => {
          const remainingTime = Math.max(0, new Date(reservation.date) - new Date());
          return { ...reservation, remainingTime };
        }).filter(reservation => reservation.remainingTime > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [setReservations]);

  // Toggle submenu
  const toggleDocumentSubmenu = (submenu) => {
    setActiveDocumentSubmenu(submenu === activeDocumentSubmenu ? null : submenu);
  };

  // Toggle calendar display
  const toggleCalendar = () => {
    setShowCalendar(prevState => !prevState);
  };

  return (
    <div className="side-bar">
      <div className="menu-header">
        <FaInbox size={30} color="#00b894" />
        <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '18px' }}>전체 메뉴</span>
      </div>
      <div className="menu-section">
        <div className="menu-item" onClick={toggleCalendar}>
          <FaCalendarAlt size={20} />
          <span style={{ marginLeft: '10px' }}>캘린더</span>
        </div>
        {showCalendar && <Calendar className="calendar-component" />}
        <div className="menu-item" onClick={() => toggleDocumentSubmenu('inbox')}>
          <FaInbox size={20} />
          <span style={{ marginLeft: '10px' }}>예약 물품</span>
        </div>
        <ul className={`submenu-content ${activeDocumentSubmenu === 'inbox' ? 'open' : ''}`}>
          {reservations.map((reservation, index) => (
            reservation.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.name} - {item.quantity}개
                {reservation.remainingTime ? ` 남은 시간: ${formatRemainingTime(reservation.remainingTime)}` : ''}
              </li>
            ))
          ))}
        </ul>
        <div className="menu-item" onClick={() => toggleDocumentSubmenu('notRefund')}>
          <MdOutlineImportExport size={20} />
          <span style={{ marginLeft: '10px' }}>미반납 물품</span>
        </div>
        <ul className={`submenu-content ${activeDocumentSubmenu === 'notRefund' ? 'open' : ''}`}>
          {notRefund.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity}개
            </li>
          ))}
        </ul>
        <div className="menu-item" onClick={() => toggleDocumentSubmenu('recent')}>
          <MdOutlineImportExport size={20} />
          <span style={{ marginLeft: '10px' }}>최근 대여 물품</span>
        </div>
        <ul className={`submenu-content ${activeDocumentSubmenu === 'recent' ? 'open' : ''}`}>
          {recent.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity}개
              <button className='btn' onClick={() => reserveItem(item)}>예약하기</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="menu-section">
        <div className="menu-item" onClick={() => toggleDocumentSubmenu('chat')}>
          <FaComment size={20} />
          <span style={{ marginLeft: '10px' }}>관리자 상담</span>
        </div>
        <div className="menu-item">
          <FaInfoCircle size={20} />
          <span style={{ marginLeft: '10px' }}>Info</span>
        </div>
        <div className="menu-item">
          <FaInfoCircle size={20} />
          <span style={{ marginLeft: '10px' }}>Request</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
