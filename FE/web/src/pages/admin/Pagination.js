import React from 'react';
import '../../style/Pagination.css';  

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pagesPerGroup = 5; 
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min((currentGroup + 1) * pagesPerGroup, totalPages);

  // 핸들러 추가
  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleFirstPage}
            disabled={currentPage <= 1}
          >
            &lt;&lt;
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          >
            &lt;
          </button>
        </li>
        {startPage > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
          </li>
        )}
        {startPage > 2 && <li className="page-item">...</li>}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNumber => (
          <li
            key={pageNumber}
            className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            <a href="#" className="page-link">
              {pageNumber}
            </a>
          </li>
        ))}
        {endPage < totalPages - 1 && <li className="page-item">...</li>}
        {endPage < totalPages && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            &gt;
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleLastPage}
            disabled={currentPage >= totalPages}
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;


