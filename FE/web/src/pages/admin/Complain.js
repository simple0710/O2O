import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Pagination } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import '../../style/Complain.css';

const Request = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    itemName: '',
    reason: '',
    itemLink: '',
    itemCount: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const postsPerPage = 10;

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setFormData({
      itemName: '',
      reason: '',
      itemLink: '',
      itemCount: ''
    });
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const { itemName, itemCount } = formData;
    if (itemName.trim() && itemCount.trim() && parseInt(itemCount, 10) >= 1) {
      const newPost = {
        ...formData,
        id: Date.now(),  // 고유 ID 생성
        requestDate: new Date().toISOString().split('T')[0],
        status: '미처리'
      };
      setPosts([...posts, newPost]);
      setFormData({
        itemName: '',
        reason: '',
        itemLink: '',
        itemCount: ''
      });
      handleClose();
    }
  };

  const handleStatusChange = (status) => {
    const updatedPosts = posts.map((post) =>
      selectedPosts.includes(post.id) ? { ...post, status } : post
    );
    setPosts(updatedPosts);
    setSelectedPosts([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((postId) => postId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePrevChunk = () => setCurrentPage(Math.max(currentPage - 5, 1));
  const handleNextChunk = () => setCurrentPage(Math.min(currentPage + 5, totalPages));

  // useEffect를 사용하여 처리완료 상태 변경 시 자동 삭제 타이머 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.status !== '처리완료'));
    }, 259200000); //3일

    return () => clearTimeout(timer);
  }, [posts]);

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h3>파손 분실 신고 내역
            <Button variant="primary" onClick={handleShow} style={{ width: '20%', marginLeft: '10px' }}>
              신고하기
            </Button>
          </h3>

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>물품 명</th>
                <th>수량</th>
                <th>처리 상태</th>
                <th>신고 날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      onChange={() => handleCheckboxChange(post.id)}
                      checked={selectedPosts.includes(post.id)}
                    />
                  </td>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.itemName}</td>
                  <td>{post.itemCount}</td>
                  <td>{post.status}</td>
                  <td>{post.requestDate}</td>
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

          <div className="mt-3">
            <Button
              className='check-button'
              onClick={() => handleStatusChange('처리완료')}
              disabled={selectedPosts.length === 0}
              style={{ marginRight: '10px' }}
            >
              처리완료
            </Button>
          </div>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>새 물품 신청</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formItemName">
                  <Form.Label>물품 명</Form.Label>
                  <Form.Control
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    placeholder="물품 명을 입력하세요"
                  />
                </Form.Group>

                <Form.Group controlId="formItemCount">
                  <Form.Label>수량</Form.Label>
                  <Form.Control
                    type="number"
                    name="itemCount"
                    value={formData.itemCount}
                    onChange={handleInputChange}
                    placeholder="수량을 입력하세요"
                    min="1"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                제출
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Request;
