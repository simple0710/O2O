import React, { useState, useEffect } from 'react';
import { Table, Collapse } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import '../../style/UserList.css';
import '../../style/Table.css';
import '../../style/Title.css';
import axiosInstance from '../../utils/axiosInstance'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination';
import { ScaleLoader } from 'react-spinners'; // 스피너 컴포넌트 임포트

const UserList = () => {
  const [overdueUsers, setOverdueUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const postsPerPage = 10;

  const fetchOverdueUsers = async (pageNumber) => {
    try {
      const response = await axiosInstance.get(`/products/overdue?pg_no=${pageNumber}&per_page=${postsPerPage}`);
      const rents = response.data.data.rents;
      const totalRequests = response.data.data.pages.total_reqs;

      const overdueItems = rents.map(rent => ({
        username: rent.user_nm,
        overduePeriod: calculateOverduePeriod(rent.due_dt),
        dueDate: rent.due_dt,
        products: rent.is_late ? rent.products.map(product => ({
          itemName: product.product_nm,
          quantity: product.product_cnt,
          lockerBody: product.locker_body
        })) : []
      }));

      setOverdueUsers(overdueItems);
      setTotalPages(Math.ceil(totalRequests / postsPerPage));
      setIsLoading(false);
    } catch (error) {
      console.error("페이지 로드에 실패했습니다.", error);
    }
  };

  const calculateOverduePeriod = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const timeDiff = now - due;

    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));

    return `${days}일 ${hours}시간 ${minutes}분`;
  };

  useEffect(() => {
    fetchOverdueUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevChunk = () => setCurrentPage(Math.max(currentPage - 5, 1));
  const handleNextChunk = () => setCurrentPage(Math.min(currentPage + 5, totalPages));

  const toggleUserDetails = (user) => {
    setExpandedUser(expandedUser === user ? null : user);
  };

  return (
    <div className="page-container">
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className='title'>
            <h3>연체 이용자 관리</h3>
          </div>
          {isLoading ? (
            <div className='user-spinner'>
              <ScaleLoader color='gray' size={50} />
            </div>
          ) : (
            <>
          <Table className='custom-table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>사용자명</th>
                <th>연체기간</th>
                <th>예정반납일</th>
              </tr>
            </thead>
            <tbody>
              {overdueUsers.map((user, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => toggleUserDetails(user)}>
                    <td>{(currentPage - 1) * postsPerPage + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.overduePeriod}</td>
                    <td>{user.dueDate}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="p-0">
                      <Collapse in={expandedUser === user}>
                        <div>
                          <Table className='custom-table'>
                            <thead>
                              <tr>
                                <th>물품명</th>
                                <th>수량</th>
                                <th>보관함 위치</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.products.map((product, idx) => (
                                <tr key={idx}>
                                  <td>{product.itemName}</td>
                                  <td>{product.quantity}개</td>
                                  <td>{product.lockerBody}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
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
           </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
