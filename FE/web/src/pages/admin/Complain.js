import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";
import AdminNav from "./AdminNav";
import "../../style/Complain.css";
import "../../style/Title.css";
import Pagination from "./Pagination";

const Request = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const postsPerPage = 10;

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(`/products/report?pg_no=${pageNumber}&per_page=${postsPerPage}`);
      const data = response.data;
      console.log(data); // 전체 데이터 로그
      console.log(data.data.rpts); // rpts 배열 로그
      setPosts(data.data.rpts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleStatusChange = async (status) => {
    const updatedPosts = posts.map((post) =>
      selectedPosts.includes(post.rpt_id)
        ? { ...post, is_processed: status === "처리완료" }
        : post
    );
    setPosts(updatedPosts);

    const postData = selectedPosts.map((id) => ({
      rpt_id: id,
      is_processed: status === "처리완료",
    }));

    console.log("Sending data:", postData);
    console.log("Type of sending data:", typeof postData);

    try {
      await axios.put("/products/report/process", postData, {
        headers: {
          "Content-Type" : "application/json"
        }
      });
      console.log("Status updated successfully");
    } catch (error) {
      console.log("Error updating status", error);
      console.log("Error response:", error.response);
    }

    setSelectedPosts([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((postId) => postId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };

  const sortedPosts = [...posts].sort((a, b) => a.is_processed - b.is_processed);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePrevChunk = () => setCurrentPage(Math.max(currentPage - 5, 1));
  const handleNextChunk = () =>
    setCurrentPage(Math.min(currentPage + 5, totalPages));

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className="title">
            <h3>파손 분실 신고 관리</h3>
          </div>
          <Table className="custom-table">
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>물품명</th>
                <th>수량</th>
                <th>신고 사유</th>
                <th>처리 상태</th>
                <th>신고 날짜</th>
                <th>신고자</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.rpt_id}>
                  <td>
                    {!post.is_processed && (
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleCheckboxChange(post.rpt_id)}
                        checked={selectedPosts.includes(post.rpt_id)}
                      />
                    )}
                  </td>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.product_nm}</td>
                  <td>{post.rpt_content}</td>
                  <td>{post.product_cnt}</td>
                  <td>{post.is_processed ? "처리완료" : "미처리"}</td>
                  <td>{post.rpt_dt}</td>
                  <td>{post.user_nm}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mt-3">
            <Button
              className="check-button"
              onClick={() => handleStatusChange("처리완료")}
              disabled={selectedPosts.length === 0}
              style={{ marginRight: "10px" }}
            >
              처리완료
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
