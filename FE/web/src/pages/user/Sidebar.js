// import React, { useContext, useState, useEffect } from 'react';
// import { FaInfoCircle, FaInbox, FaShoppingCart } from 'react-icons/fa';
// import { MdOutlineImportExport } from 'react-icons/md';
// import {Link, useLocation} from 'react-router-dom';
// import Cart from './Cart';
// import Modals from './Modals';
// import '../../style/Sidebar.css';
// import { CartContext } from './CartContext';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';

// function Sidebar() {
//   const { reservations } = useContext(CartContext);
//   const [activeDocumentSubmenu, setActiveDocumentSubmenu] = useState(null);
//   const [show, setShow] = useState(false);
//   const [modalCloseConfirmed, setModalCloseConfirmed] = useState(false);

//   const handleShow = () => {
//     setShow(true);
//     document.body.style.overflow = "hidden";
//   };

//   const handleClose = (confirmed) => {
//     setShow(false);
//     document.body.style.overflow = "auto";
//     if (confirmed) {
//       setModalCloseConfirmed(true);
//     }
//   };


//   // Styled components 정의
// const SidebarContainer = styled.div`
// display: flex;
// flex-direction: column;
// width: 250px;
// background-color: #f8f9fa;
// padding: 20px;
// `;

// const SidebarLink = styled(Link)`
// display: block;
// padding: 10px;
// margin-bottom: 5px;
// text-decoration: none;
// color: ${props => (props.isActive ? 'white' : 'black')};
// background-color: ${props => (props.isActive ? 'black' : 'transparent')};
// border-radius: 4px;
// font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
// cursor: ${props => (props.isActive ? 'default' : 'pointer')}; /* 비활성화된 링크의 커서 스타일 */

// &:hover {
//   background-color: ${props => (props.isActive ? 'grey' : '#e9ecef')};
// }
// `;

//   useEffect(() => {
//     if (modalCloseConfirmed) {
//       Swal.fire({
//         title: "요청이 접수되었습니다.",
//         icon: "success",
//         confirmButtonColor: "#3085d6",
//         confirmButtonText: "확인",
//       });
//       setModalCloseConfirmed(false);
//     }
//   }, [modalCloseConfirmed]);

//   const notRefund = [
//     { name: "가위", quantity: 4 },
//     { name: "풀", quantity: 5 },
//   ];

//   const recent = [
//     { name: "가위", quantity: 4 },
//     { name: "잉크", quantity: 5 }
//   ];

//   const toggleDocumentSubmenu = (submenu) => {
//     setActiveDocumentSubmenu(submenu === activeDocumentSubmenu ? null : submenu);
//   };

//   const location = useLocation();
//   const [activeLink, setActiveLink] = useState(location.pathname);

//   // 클릭 이벤트 핸들러
//   const handleLinkClick = (path) => {
//     setActiveLink(path);
//   };

//   return (
//     <SidebarContainer className="side-bar">
//       <div className="menu-section">
//         {/* <div className="menu-item" onClick={() => toggleDocumentSubmenu('inbox')}>
//           <FaInbox size={22} />
//           <span style={{ marginLeft: '15px' }}>예약 물품</span>
//         </div>
//         <ul className={`submenu-content ${activeDocumentSubmenu === 'inbox' ? 'open' : ''}`}>
//           {reservations.map((reservation, index) => (
//             reservation.items.map((item, itemIndex) => (
//               <li key={itemIndex}>
//                 {item.name} - {item.quantity}개
//               </li>
//             ))
//           ))}
//         </ul>
//         <div className="menu-item" onClick={() => toggleDocumentSubmenu('notRefund')}>
//           <MdOutlineImportExport size={22} />
//           <span style={{ marginLeft: '15px' }}>미반납 물품</span>
//         </div>
//         <ul className={`submenu-content ${activeDocumentSubmenu === 'notRefund' ? 'open' : ''}`}>
//           {notRefund.map((item, index) => (
//             <li key={index}>
//               {item.name} - {item.quantity}개
//             </li>
//           ))}
//         </ul> */}
//         <div className="menu-item" onClick={() => toggleDocumentSubmenu('recent')}>
//           <MdOutlineImportExport size={22} />
//           <span style={{ marginLeft: '15px' }}>최근 대여 물품</span>
//         </div>
//         <ul className={`submenu-content ${activeDocumentSubmenu === 'recent' ? 'open' : ''}`}>
//           {recent.map((item, index) => (
//             <li key={index}>
//               {item.name} - {item.quantity}개
//               <button className='btn'>예약하기</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* <div className="menu-section">
//         <div className="menu-item" onClick={handleShow}>
//           <FaInfoCircle size={22} />
//           <span style={{ marginLeft: '15px' }}>물품 요청</span>
//           <span>물품 요청</span>
//         </div>
//       </div> */}
//       <SidebarLink
//         to="/request/article"
//         isActive={activeLink === '/request/article'}
//         onClick={() => handleLinkClick('/request/article')}
//       >
//         물품 요청
//       </SidebarLink>
//       <SidebarLink
//         to="/item/borrow"
//         isActive={activeLink === '/item/borrow'}
//         onClick={() => handleLinkClick('/item/borrow')}
//       >
//         예약 현황 조회
//       </SidebarLink>

//       <SidebarLink
//         to="/item/notrefund"
//         isActive={activeLink === '/item/notrefund'}
//         onClick={() => handleLinkClick('/item/notrefund')}
//       >
//         미반납 물품 조회
//       </SidebarLink>

//       <SidebarLink

//       >
//         최근 대여 물품
//       </SidebarLink>

//       <Modals show={show} handleClose={handleClose} />
//     </SidebarContainer>
//   );
// }

// export default Sidebar;



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
        to="/item/borrow"
        isActive={activeLink === '/item/borrow'}
        onClick={() => handleLinkClick('/item/borrow')}
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
        <h4>최근 대여 물품</h4>
        <ul>
          {recent.map((item, index) => (
            <li key={index}>{item.name} - {item.quantity}개</li>
          ))}
        </ul>
      </AlertBox>
    </SidebarContainer>
  );
}

export default Sidebar;
