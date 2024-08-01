import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import Pagination from './Pagination'; 
import '../../style/UserList.css';
import '../../style/Table.css';  
import '../../style/Title.css';  
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [overdueUsers, setOverdueUsers] = useState([]);
  useEffect(() => {
    axios.get('/overdue_userlist.json')
      .then(response => {
        const rents = response.data.data.rents;
        const overdueItems = rents.filter(rent => rent.is_late)
          .flatMap(rent => rent.products.map(product => ({
            username: rent.user_nm,
            itemName: product.product_name,
            quantity: product.product_cnt,
            overduePeriod: calculateOverduePeriod(rent.due_dt),
            dueDate: rent.due_dt
          })));
        setOverdueUsers(overdueItems);
      })
      .catch(error => {
        console.error("페이지 로드에 실패했습니다.", error);
      });
  }, []);

  const calculateOverduePeriod = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const timeDiff = now - due;

    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));

    return `${days}일 ${hours}시간 ${minutes}분`;
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevChunk = () => setCurrentPage(Math.max(currentPage - 5, 1));
  const handleNextChunk = () => setCurrentPage(Math.min(currentPage + 5, totalPages));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = overdueUsers.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(overdueUsers.length / postsPerPage);

  return (
    <div className="page-container">
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className='title'>
            <h3>연체 이용자 관리</h3>
          </div>
          <Table className='custom-table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>사용자명</th>
                <th>물품명</th>
                <th>연체 물품 수량</th>
                <th>연체기간</th>
                <th>예정반납일</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((user, index) => (
                <tr key={index}>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.itemName}</td>
                  <td>{user.quantity}개</td>
                  <td>{user.overduePeriod}</td>
                  <td>{user.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handlePrevChunk={handlePrevChunk}
            handleNextChunk={handleNextChunk}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
