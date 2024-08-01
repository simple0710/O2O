import React, { useContext, useState, useEffect } from 'react';
import { FaInfoCircle, FaInbox, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineImportExport } from 'react-icons/md';
import Cart from './Cart';
import Modals from './Modals';
import '../../style/Sidebar.css';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';

function Sidebar() {
  const { reservations } = useContext(CartContext);
  const [activeDocumentSubmenu, setActiveDocumentSubmenu] = useState(null);
  const [show, setShow] = useState(false);
  const [modalCloseConfirmed, setModalCloseConfirmed] = useState(false);

  const handleShow = () => {
    setShow(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = (confirmed) => {
    setShow(false);
    document.body.style.overflow = "auto";
    if (confirmed) {
      setModalCloseConfirmed(true);
    }
  };

  useEffect(() => {
    if (modalCloseConfirmed) {
      Swal.fire({
        title: "요청이 접수되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      setModalCloseConfirmed(false);
    }
  }, [modalCloseConfirmed]);

  const notRefund = [
    { name: "가위", quantity: 4 },
    { name: "풀", quantity: 5 },
  ];

  const recent = [
    { name: "가위", quantity: 4 },
    { name: "잉크", quantity: 5 }
  ];

  const toggleDocumentSubmenu = (submenu) => {
    setActiveDocumentSubmenu(submenu === activeDocumentSubmenu ? null : submenu);
  };

  return (
    <div className="side-bar">
      <div className="menu-header">
        <FaInbox size={30} color="#00b894" />
        <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '20px' }}>전체 메뉴</span>
      </div>
      <div className="menu-section">
        <div className="menu-item" onClick={() => toggleDocumentSubmenu('inbox')}>
          <FaInbox size={22} />
          <span style={{ marginLeft: '15px' }}>예약 물품</span>
        </div>
        <ul className={`submenu-content ${activeDocumentSubmenu === 'inbox' ? 'open' : ''}`}>
          {reservations.map((reservation, index) => (
            reservation.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.name} - {item.quantity}개
              </li>
            ))
          ))}
        </ul>
        <div className="menu-item" onClick={() => toggleDocumentSubmenu('notRefund')}>
          <MdOutlineImportExport size={22} />
          <span style={{ marginLeft: '15px' }}>미반납 물품</span>
        </div>
        <ul className={`submenu-content ${activeDocumentSubmenu === 'notRefund' ? 'open' : ''}`}>
          {notRefund.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity}개
            </li>
          ))}
        </ul>
        <div className="menu-item" onClick={() => toggleDocumentSubmenu('recent')}>
          <MdOutlineImportExport size={22} />
          <span style={{ marginLeft: '15px' }}>최근 대여 물품</span>
        </div>
        <ul className={`submenu-content ${activeDocumentSubmenu === 'recent' ? 'open' : ''}`}>
          {recent.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity}개
              <button className='btn'>예약하기</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="menu-section">
        <div className="menu-item" onClick={handleShow}>
          <FaInfoCircle size={22} />
          <span style={{ marginLeft: '15px' }}>물품 요청</span>
        </div>
        <div className="menu-item">
          <FaShoppingCart size={22} />
          <span style={{ marginLeft: '15px' }}><Cart/></span>
        </div>
      </div>

      <Modals show={show} handleClose={handleClose} />
    </div>
  );
}

export default Sidebar;
