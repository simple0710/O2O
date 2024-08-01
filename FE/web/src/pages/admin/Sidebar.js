import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Styled components 정의
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
`;

const SidebarLink = styled(Link)`
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  color: ${props => (props.isActive ? 'white' : 'grey')};
  background-color: ${props => (props.isActive ? 'black' : 'transparent')};
  border-radius: 4px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  cursor: ${props => (props.isActive ? 'default' : 'pointer')}; /* 비활성화된 링크의 커서 스타일 */
  
  &:hover {
    background-color: ${props => (props.isActive ? 'grey' : '#e9ecef')};
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  // 클릭 이벤트 핸들러
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <SidebarContainer className='side-bar'>
      <div className='admin-side-bar'>
      <SidebarLink
        to="/admin/request"
        isActive={activeLink === '/admin/request'}
        onClick={() => handleLinkClick('/admin/request')}
      >
        물건 요청 관리 페이지
      </SidebarLink>
      <SidebarLink
        to="/admin/complain"
        isActive={activeLink === '/admin/complain'}
        onClick={() => handleLinkClick('/admin/complain')}
      >
        파손, 분실 신고 관리
      </SidebarLink>
      <SidebarLink
        to="/admin/statics"
        isActive={activeLink === '/admin/statics'}
        onClick={() => handleLinkClick('/admin/statics')}
      >
        물건 사용빈도 통계
      </SidebarLink>
      <SidebarLink
        to="/admin/userlist"
        isActive={activeLink === '/admin/userlist'}
        onClick={() => handleLinkClick('/admin/userlist')}
      >
        연체 이용자 리스트
      </SidebarLink>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
