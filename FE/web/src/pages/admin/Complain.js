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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/report");
        console.log(response.data.data.rpts);
        const data = response.data.data.rpts;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (status) => {
    const updatedPosts = posts.map((post) =>
      selectedPosts.includes(post.rpt_id)
        ? { ...post, is_processed: status === "처리완료" }
        : post
    );
    setPosts(updatedPosts);

    // POST 요청을 보낼 데이터 생성
    const postData = selectedPosts.map((id) => ({
      rpt_id: id,
      is_processed: status === "처리완료",
    }));

    try {
      await axios.post("/products/report/update", postData);
      console.log("Status updated successfully");
    } catch (error) {
      console.log("Error updating status", error);
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

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // 미처리 항목을 위로 오도록 정렬
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
                <th>처리 상태</th>
                <th>신고 날짜</th>
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
                  <td>{post.product_id}</td>
                  <td>{post.product_cnt}</td>
                  <td>{post.is_processed ? "처리완료" : "미처리"}</td>
                  <td>{post.rpt_dt}</td>
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
