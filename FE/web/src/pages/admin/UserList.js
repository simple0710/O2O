import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import '../../style/UserList.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [overdueUsers, setOverdueUsers] = useState([]);
  useEffect(() => {
    // JSON 파일을 로드
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
          <h3>연체 이용자 리스트 관리</h3>
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>사용자명</th>
                <th>물품 명</th>
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
          <div className="pagination-container">
          <Pagination className='justify-content-center'>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={handlePrevChunk} />
            <Pagination.Item onClick={() => handlePageChange(1)}>{1}</Pagination.Item>
            {currentPage > 3 && <Pagination.Ellipsis />}
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(Math.max(currentPage - 3, 1), Math.min(currentPage + 2, totalPages - 1))
              .map(pageNumber => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              ))}
            {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
            {totalPages > 1 && (
              <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </Pagination.Item>
            )}
            <Pagination.Next onClick={handleNextChunk} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserList;
