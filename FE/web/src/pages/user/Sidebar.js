import React, { useContext, useState, useEffect } from 'react';
import { FaInfoCircle, FaInbox, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineImportExport } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import Cart from './Cart';
import Modals from './Modals';
import '../../style/Sidebar.css';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { getRecent } from '../../api/userget';

// Define styled components outside of the functional component
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;  // Fixed width of the sidebar
  background-color: #f8f9fa;
  padding: 20px;
  position: relative;  // For positioning AlertBox
`;

const SidebarLink = styled(Link)`
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  color: ${props => (props.isActive ? 'white' : 'black')};
  background-color: ${props => (props.isActive ? 'black' : 'transparent')};
  border-radius: 4px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};

  &:hover {
    background-color: ${props => (props.isActive ? 'grey' : '#e9ecef')};
  }
`;

const AlertBox = styled.div`
  left: 0;
  width: 100%;  // Match the width of the sidebar
  max-width: 240px;  // Ensure it doesn't exceed sidebar width
  background-color: gray;
  border-radius: 10px;
  color: white;
  padding: 20px;
  box-sizing: border-box;  // Ensure padding is included in width
  overflow-y: auto;  // Enable scrolling if content overflows
  display: ${props => (props.show ? 'block' : 'none')};
`;

const AddButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: black;
  }
`;

function Sidebar() {
  const { reservations } = useContext(CartContext);
  const [activeDocumentSubmenu, setActiveDocumentSubmenu] = useState(null);
  const [show, setShow] = useState(false);
  const [modalCloseConfirmed, setModalCloseConfirmed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  const recent = [
    { name: "가위", quantity: 4 },
    { name: "잉크", quantity: 5 }
  ];

  const toggleDocumentSubmenu = (submenu) => {
    setActiveDocumentSubmenu(submenu === activeDocumentSubmenu ? null : submenu);
  };

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleRecentClick = () => {
    setShowAlert(!showAlert);
    setActiveLink('/item/recent');  // Update the active link when the button is clicked
  };



  return (
    <SidebarContainer className="side-bar">
      <SidebarLink
        to="/request/article"
        isActive={activeLink === '/request/article'}
        onClick={() => handleLinkClick('/request/article')}
      >
        물품 요청
      </SidebarLink>
      <SidebarLink
        to="/item/reservation"
        isActive={activeLink === '/item/reservation'}
        onClick={() => handleLinkClick('/item/reservation')}
      >
        예약 현황 조회
      </SidebarLink>

      <SidebarLink
        to="/item/notrefund"
        isActive={activeLink === '/item/notrefund'}
        onClick={() => handleLinkClick('/item/notrefund')}
      >
        미반납 물품 조회
      </SidebarLink>

      <SidebarLink
        as="div"
        isActive={activeLink === '/item/recent'}  // Ensure this link is styled as active
        onClick={handleRecentClick}
      >
        최근 대여 물품
      </SidebarLink>

      <Modals show={show} handleClose={handleClose} />

      <AlertBox show={showAlert}>
        <ul>
          {recent.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity}개
              <AddButton>추가</AddButton>
            </li>
          ))}
        </ul>
      </AlertBox>
    </SidebarContainer>
  );
}

export default Sidebar;
