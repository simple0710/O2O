import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';
import '../styles/common/Common.css';
import { getCurrentProducts } from '../api/brokenfind.js';
import IncreaseDecreaseButton from '../components/common/IncreaseDecreaseButton.js';
import { formatDateSimple } from '../util/dateUtil.js';
import { getUserIdFromSession } from '../util/sessionUtils.js';
import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';
import { Loading } from '../components/common/loading.js';
import { getProductIcon } from '../util/productUtil.js'; // getProductIcon 함수 임포트

function BrokenFind() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lockerBodyId, setLockerBodyId] = useState(null);
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가
  const itemsPerPage = 4;
  const [selectedRent, setSelectedRent] = useState([]);


  useEffect(() => {
    const id = getUserIdFromSession();
    if (id) {
      setUserId(id);
    }

    saveLockerBodyIdFromLocal();
    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);
  }, []);

  useEffect(() => {
    if (userId) {
      getBrokenValues();
    }
  }, [userId]);

  const getBrokenValues = async () => {
    setLoading(true);  // 데이터 로딩 시작 시 로딩 상태 설정
    let allRentsData = [];
    let currentPage = 1;
    let hasMoreData = true;
  
    while (hasMoreData) {
      const data = await getCurrentProducts(userId, currentPage, 10); // 페이지 넘버와 페이지 당 항목 수를 전달     
      if (data && data.rents.length > 0) {
        const rentsData = [];
        for (let rent of data.rents) {
          const productsData = [];
          const rentId = rent.rent_id; // rent_id를 추출

          for (let product of rent.products) {
            const productLockerBodyId = String(product.locker_body_id);
            const localLockerBodyId = String(lockerBodyId);
            if (localLockerBodyId !== '' && productLockerBodyId !== localLockerBodyId) continue;
            if (product.status[1].product_cnt === 0) continue;
            productsData.push({
              id: product.product_id,
              name: product.product_name,
              cnt: product.status[1].product_cnt,
              date: rent.rent_dt,
              broken: 0,
              missing: 0,
              icon: getProductIcon(product.product_id), // getProductIcon 함수 사용
              locker_id: product.locker_id,
              rent_id: rentId // rent_id를 추가
            });
          }
          if (productsData.length > 0) {
            rentsData.push(productsData);
          }
        }
        allRentsData = [...allRentsData, ...rentsData]; // 결과를 누적하여 추가
        currentPage++;
      } else {
        hasMoreData = false; // 데이터가 없으면 반복 종료
      }
    }
  
    setItems(allRentsData); // 모든 데이터를 상태에 설정
    setLoading(false);  // 데이터 로딩 완료 시 로딩 상태 해제
  };

  const reportItems = () => {
    const reportedItems = [];
    selectedRent.forEach(index => {
      if (index < items.length) {
        reportedItems.push(...items[index].filter(item => item.missing > 0 || item.broken > 0));
      }
    });
    
    if (reportedItems.length > 0) {
      navigate('/registerbroken', { state: { reportedItems } });
    } else {
      console.log('선택된 대여가 없거나 신고할 항목이 없습니다.');
    }
  };

  const increaseQuantity = (rentIndex, productIndex, type) => {
    const globalRentIndex = startIndex + rentIndex; // 전체 items 배열에서의 실제 인덱스 계산
    setItems(prevItems =>
      prevItems.map((rent, rInd) =>
        rInd === globalRentIndex // 전체 items 배열에서의 인덱스와 비교
          ? rent.map((item, pInd) =>
              pInd === productIndex
                ? {
                    ...item,
                    [type]:
                      item.cnt - (item.broken + item.missing) === 0
                        ? item[type]
                        : item[type] + 1,
                  }
                : item
            )
          : rent
      )
    );
  };
  
  const decreaseQuantity = (rentIndex, productIndex, type) => {
    const globalRentIndex = startIndex + rentIndex; // 전체 items 배열에서의 실제 인덱스 계산
    setItems(prevItems =>
      prevItems.map((rent, rInd) =>
        rInd === globalRentIndex // 전체 items 배열에서의 인덱스와 비교
          ? rent.map((item, pInd) =>
              pInd === productIndex
                ? { ...item, [type]: Math.max(item[type] - 1, 0) }
                : item
            )
          : rent
      )
    );
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + direction;
      return Math.max(1, Math.min(newPage, Math.ceil(items.length / itemsPerPage)));
    });
    setSelectedRent([]); // 페이지 전환 시 선택된 렌트 초기화
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(-1)}
          className="pagination-button"
          disabled={currentPage === 1}
        >
          <svg height="20" width="20">
            <polygon points="10,0 0,10 10,20" fill="#0093ed" />
          </svg>
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(1)}
          className="pagination-button"
          disabled={currentPage === totalPages}
        >
          <svg height="20" width="20">
            <polygon points="0,0 10,10 0,20" fill="#0093ed" />
          </svg>
        </button>
      </div>
    );
  };

  const handleItemClick = (index) => {
    setSelectedRent(prevSelectedRent => {
      if (prevSelectedRent.includes(index)) {
        return prevSelectedRent.filter(i => i !== index);
      } else {
        return [...prevSelectedRent, index];
      }
    });
  };
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const renderNoItemsMessage = () => (
    <h4>대여 중인 물품이 없습니다 <span role="img" aria-label="머쓱">😅</span></h4>
  );

  return (
    <div className='frame-container'>
      <button className="btn-main" onClick={() => navigate('/')}>
        HOME
      </button>
      <div className="cart-container">
        <h2>대여물품조회</h2>
        {loading ? (  // 로딩 상태에 따라 Loading 컴포넌트를 표시
          <Loading />
        ) : (
          <div className="broken-items">
            {items.length === 0 ? (
              renderNoItemsMessage()
            ) : (
              selectedItems.map((rent, rInd) => (
                <div key={rInd} className="rent">
                  <div>
                    <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
                  </div>
                  {rent.map((item, pInd) => (
                    <div
                      key={`${rInd}.${pInd}`}
                      className='item'
                      onClick={() => handleItemClick(startIndex + rInd)}
                    >
                      <div className="item-header">
                        <span className="item-icon">{item.icon}</span>
                        <span>
                          <p className="item-name">{item.name}</p>
                        </span>
                      </div>
                      <div className="item-controls">
                        <div className="control">
                          <span className="preserve-horizontal-text extreme-small-font">파손</span>
                          <IncreaseDecreaseButton
                             increaseQuantity={increaseQuantity}
                             decreaseQuantity={decreaseQuantity}
                             count={item.broken}
                             rIndex={rInd}
                             pIndex={pInd}
                             type='broken'
                          />
                        </div>
                        <div className="control">
                          <span className="preserve-horizontal-text extreme-small-font">분실</span>
                          <IncreaseDecreaseButton
                             increaseQuantity={increaseQuantity}
                             decreaseQuantity={decreaseQuantity}
                             count={item.missing}
                             rIndex={rInd}
                             pIndex={pInd}
                             type='missing'
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
        <div>
          {renderPagination()}
        </div>
        <button className="report-button" onClick={reportItems}>신고하기</button>
      </div>
    </div>
  );
}

export default BrokenFind;
