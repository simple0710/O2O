import React, { useState } from 'react';
import '../../style/Pagination.css';  

const Paginations = ({ totalPages }) => {
  const [activePage, setActivePage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0); 

  const pagesPerGroup = 5; 

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    const newGroup = Math.floor((pageNumber - 1) / pagesPerGroup);
    setCurrentGroup(newGroup);
  };

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
      setActivePage(currentGroup * pagesPerGroup + 1);
    }
  };

  const handleNextGroup = () => {
    if ((currentGroup + 1) * pagesPerGroup < totalPages) {
      setCurrentGroup(currentGroup + 1);
      setActivePage((currentGroup + 1) * pagesPerGroup + 1);
    }
  };

  const handleFirstPage = () => {
    setActivePage(1);
    setCurrentGroup(0);
  };

  const handleLastPage = () => {
    setActivePage(totalPages);
    setCurrentGroup(Math.floor((totalPages - 1) / pagesPerGroup));
  };

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min((currentGroup + 1) * pagesPerGroup, totalPages);

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleFirstPage}
          >
            &lt;&lt;
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={handlePrevGroup}
          >
            &lt;
          </button>
        </li>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNumber => (
          <li
            key={pageNumber}
            className={`page-item ${activePage === pageNumber ? 'active' : ''}`}
            onClick={() => handlePageClick(pageNumber)}
          >
            <a href="#" className="page-link">
              {pageNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextGroup}
          >
            &gt;
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleLastPage}
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginations;
