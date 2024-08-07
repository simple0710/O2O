import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
import AdminNav from "./AdminNav";
import "../../style/Request.css";
import "../../style/Table.css";
import "../../style/Title.css";
import axios from "axios";
import Pagination from "./Pagination";
import axiosInstance from '../../utils/axiosInstance'

const Request = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const postsPerPage = 10;

  const fetchData = async () => {
    let pageNumber = 1;
    let allPosts = [];
    let hasMoreData = true;

    while (hasMoreData) {
      try {
        const response = await axiosInstance.get(`/products/request?pg_no=${pageNumber}&per_page=${postsPerPage}`);
        const data = response.data;
        const fetchedPosts = data.data.reqs;

        if (fetchedPosts.length === 0) {
          hasMoreData = false;
        } else {
          allPosts = [...allPosts, ...fetchedPosts];
          pageNumber += 1;
        }
      } catch (error) {
        console.log(error);
        hasMoreData = false;
      }
    }

    // Sort posts: unapproved requests (with checkboxes) come first, then approved, then rejected
    allPosts.sort((a, b) => {
      if (!a.is_approved && !a.is_rejected && (b.is_approved || b.is_rejected)) return -1; // Unapproved requests first
      if ((a.is_approved || a.is_rejected) && !b.is_approved && !b.is_rejected) return 1; // Approved or rejected requests later
      if (a.is_approved && b.is_rejected) return -1; // Approved comes before rejected
      if (a.is_rejected && b.is_approved) return 1; // Rejected comes after approved
      return 0;
    });

    setPosts(allPosts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (status) => {
    const updatedPosts = posts.map((post) =>
      selectedPosts.includes(post.req_id) ? { ...post, status } : post
    );
    setPosts(updatedPosts);
    setSelectedPosts([]);

    const postData = selectedPosts.map((req_id) => ({
      req_id,
      req_status: status === "승인됨" ? "approved" : "rejected",
    }));

    try {
      await axiosInstance.put('/products/request/process', postData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      // Re-fetch data to update the posts list
      fetchData();
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className="title">
            <h3>물건 요청 관리</h3>
          </div>
          <Table className="custom-table">
            <thead className="custom-header">
              <tr>
                <th></th>
                <th>No.</th>
                <th>물품명</th>
                <th>수량</th>
                <th className="request-reason">신청 사유</th>
                <th>처리 상태</th>
                <th>신청 날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.req_id}>
                  <td>
                    {post.is_approved || post.is_rejected ? (
                      <div style={{ width: "16px" }}></div>
                    ) : (
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleCheckboxChange(post.req_id)}
                        checked={selectedPosts.includes(post.req_id)}
                      />
                    )}
                  </td>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.product_nm}</td>
                  <td>{post.product_cnt}</td>
                  <td>{post.req_content}</td>
                  <td>
                    {post.is_approved
                      ? "승인됨"
                      : post.is_rejected
                      ? "거절됨"
                      : "대기중"}
                  </td>
                  <td>{post.req_dt}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mt-3">
            <Button
              className="success-button"
              onClick={() => handleStatusChange("승인됨")}
              disabled={selectedPosts.length === 0}
              style={{ marginRight: "10px" }}
            >
              수락
            </Button>
            <Button
              className="reject-button"
              onClick={() => handleStatusChange("거절됨")}
              disabled={selectedPosts.length === 0}
            >
              거절
            </Button>
          </div>

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

export default Request;
