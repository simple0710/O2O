
// import React, { useContext, useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';
// import { getRecent } from '../../api/userget';
// import { CartContext } from './CartContext';
// import Modals from './Modals';
// import '../../style/Sidebar.css';

// // Define styled components outside of the functional component
// const SidebarContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 250px;  // Fixed width of the sidebar
//   background-color: #f8f9fa;
//   padding: 20px;
//   position: relative;  // For positioning AlertBox
// `;

// const SidebarLink = styled(Link)`
//   display: block;
//   padding: 10px;
//   margin-bottom: 5px;
//   text-decoration: none;
//   color: ${props => (props.isActive ? 'white' : 'black')};
//   background-color: ${props => (props.isActive ? 'black' : 'transparent')};
//   border-radius: 4px;
//   font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
//   cursor: ${props => (props.isActive ? 'default' : 'pointer')};

//   &:hover {
//     background-color: ${props => (props.isActive ? 'grey' : '#e9ecef')};
//   }
// `;

// const AlertBox = styled.div`
//   left: 0;
//   width: 100%;  // Match the width of the sidebar
//   max-width: 240px;  // Ensure it doesn't exceed sidebar width
//   background-color: gray;
//   border-radius: 10px;
//   color: white;
//   padding: 20px;
//   box-sizing: border-box;  // Ensure padding is included in width
//   overflow-y: auto;  // Enable scrolling if content overflows
//   display: ${props => (props.show ? 'block' : 'none')};
// `;

// const AddButton = styled.button`
//   background-color: transparent;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 5px 10px;
//   cursor: pointer;
//   margin-left: 10px;

//   &:hover {
//     background-color: black;
//   }
// `;

// function Sidebar() {
//   const { reservations, addToCart, cart } = useContext(CartContext);
//   const [activeDocumentSubmenu, setActiveDocumentSubmenu] = useState(null);
//   const [show, setShow] = useState(false);
//   const [modalCloseConfirmed, setModalCloseConfirmed] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [recentRent, setRecentRent] = useState([]);

//   useEffect(() => {
//     const fetchRecent = async () => {
//       try {
//         const data = await getRecent(1, 10, 4);  // 4는 유저 아이디 변수로 변환 예정
//         setRecentRent(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchRecent();
//   }, []);

//   useEffect(() => {
//     console.log('최근 대여 내역: ', recentRent);
//   }, [recentRent]);

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

//   const toggleDocumentSubmenu = (submenu) => {
//     setActiveDocumentSubmenu(submenu === activeDocumentSubmenu ? null : submenu);
//   };

//   const location = useLocation();
//   const [activeLink, setActiveLink] = useState(location.pathname);

//   const handleLinkClick = (path) => {
//     setActiveLink(path);
//   };

//   const handleRecentClick = () => {
//     setShowAlert(!showAlert);
//     setActiveLink('/item/recent');  // Update the active link when the button is clicked
//   };



//   const handleAddToCart = (productName, productCnt, lockerBodyId, lockerId, productId) => {
//     const item = {
//       product_name: productName,
//       locker_body_id: lockerBodyId,
//       product_cnt: productCnt,
//       locker_id: lockerId,
//       product_id: productId
//     };
//     console.log('Adding to Cart: ', item)
//     addToCart(item);
//   };
  

 
//   const listItems = recentRent.reduce((acc, item) => {
//     item.products.forEach(product => {
//       if (acc.count < 5) {
//         acc.items.push(
//           <li key={`${item.id}-${product.product_id}`}>
//             {product.product_name} - {product.product_cnt}개
//             <AddButton onClick={() => handleAddToCart(product.product_name, product.product_cnt, product.locker_body_id, product.locker_id, product.product_id)}>
//               추가
//             </AddButton>
//           </li>
//         );
//         acc.count++;
//       }
//     });
//     return acc;
//   }, { items: [], count: 0 }).items;
  

  

//   return (
//     <SidebarContainer className="side-bar">
//       <SidebarLink
//         to="/request/article"
//         isActive={activeLink === '/request/article'}
//         onClick={() => handleLinkClick('/request/article')}
//       >
//         물품 요청
//       </SidebarLink>
//       <SidebarLink
//         to="/item/reservation"
//         isActive={activeLink === '/item/reservation'}
//         onClick={() => handleLinkClick('/item/reservation')}
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
//         as="div"
//         isActive={activeLink === '/item/recent'}  // Ensure this link is styled as active
//         onClick={handleRecentClick}
//       >
//         최근 대여 물품
//       </SidebarLink>

//       <Modals show={show} handleClose={handleClose} />

//       <AlertBox show={showAlert}>
//         <ul>
//           {listItems}
//         </ul>
//       </AlertBox>
//     </SidebarContainer>
//   );
// }

// export default Sidebar;





import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { getRecent } from '../../api/userget';
import { CartContext } from './CartContext';
import Modals from './Modals';
import ButtonComponent from '../../components/ButtonComponent'; 
import '../../style/Sidebar.css';

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
  const { reservations, addToCart, cart } = useContext(CartContext);
  const [activeDocumentSubmenu, setActiveDocumentSubmenu] = useState(null);
  const [show, setShow] = useState(false);
  const [modalCloseConfirmed, setModalCloseConfirmed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [recentRent, setRecentRent] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await getRecent(1, 10, userId);  // 4는 유저 아이디 변수로 변환 예정
        console.log('userId',userId)
        setRecentRent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecent();
  }, []);

  useEffect(() => {
    console.log('최근 대여 내역: ', recentRent);
  }, [recentRent]);

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



  const handleAddToCart = (productName, productCnt, lockerBodyId, lockerId, productId) => {
    const existingItemIndex = cart.findIndex(item => 
      item.name === productName &&
      item.location.locker_body_id === lockerBodyId
    );
  
    if (existingItemIndex !== -1) {
      // 이미 장바구니에 있는 물건이면 수량을 업데이트
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + productCnt,
      };
      setCart(updatedCart);
    } else {
      // 장바구니에 없는 물건이면 새로 추가
      const item = {
        name: productName,
        quantity: productCnt,
        location: { locker_body_id: lockerBodyId },
        product_id: productId,
        locker_id: lockerId
      };
      addToCart(item);
    }
  };
  

 
  const listItems = recentRent.reduce((acc, item) => {
    item.products.forEach(product => {
      if (acc.count < 5) {
        acc.items.push(
          <li key={`${item.id}-${product.product_id}`}>
            {product.product_name} - {product.product_cnt}개
            <ButtonComponent 
            onClick={() => handleAddToCart(product.product_name, product.product_cnt, product.locker_body_id, product.locker_id, product.product_id)}
            style={{ 
              marginBottom: '15px'
            }}
            className="black-hover-button" 
            >
              추가
            </ButtonComponent>
          </li>
        );
        acc.count++;
      }
    });
    return acc;
  }, { items: [], count: 0 }).items;
  

  

  return (
    <SidebarContainer className="side-bar">
      <div style={{marginTop:'35px'}}>
      <SidebarLink
        to="/"
        isActive={activeLink === '/'}
        onClick={() => handleLinkClick('/')}
      >
        사물함 현황
      </SidebarLink>
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
        예약 현황
      </SidebarLink>
      <SidebarLink
        to="/item/notrefund"
        isActive={activeLink === '/item/notrefund'}
        onClick={() => handleLinkClick('/item/notrefund')}
      >
        대여중인 물품
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
          {listItems}
        </ul>
      </AlertBox>
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;




