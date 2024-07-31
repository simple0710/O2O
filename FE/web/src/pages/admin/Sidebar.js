import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Sidebar.css'; 


const Sidebar = () => {
  return (
  <div className="side-bar">
    <Link to="/admin/request" className="side-bar-item">물건 요청 관리 페이지</Link>
    <Link to="/admin/complain" className="side-bar-item">파손, 분실 신고 관리</Link>
    <Link to="/admin/statics" className="side-bar-item">물건 사용빈도 통계</Link>
    <Link to="/admin/userlist" className="side-bar-item">연체 이용자 리스트</Link>
  </div>
  )
};

export default Sidebar;
