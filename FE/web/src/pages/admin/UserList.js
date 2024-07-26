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
            overdueDays: calculateOverdueDays(rent.due_dt),
            dueDate: rent.due_dt
          })));
        setOverdueUsers(overdueItems);
      })
      .catch(error => {
        console.error("페이지 로드에 실패했습니다.", error);
      });
  }, []);

  const calculateOverdueDays = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const timeDiff = now - due;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = overdueUsers.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(overdueUsers.length / postsPerPage);

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h3>연체 이용자 리스트 관리</h3>
          <Table striped bordered hover className="mt-4">
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
                  <td>{user.overdueDays}일</td>
                  <td>{user.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <Pagination.Item
                key={pageIndex + 1}
                active={pageIndex + 1 === currentPage}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default UserList;
