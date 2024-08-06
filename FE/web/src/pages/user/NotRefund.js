import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import '../../style/RequestItme.css';
import { Table } from 'react-bootstrap';
import { getRent } from '../../api/userget';
import Pagination from "../admin/Pagination";

const NotRefund = () => {
    const [currentRent, setCurrentRent] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);

    const fetchCurrentRent = useCallback(async (page) => {
        setIsLoading(true);
        try {
            console.log(`Fetching page ${page}`);
            const data = await getRent(page, 10, 4); // 4는 유저아이디, 나중에 변수로 바꿀 수 있음
            console.log(`Fetched data for page ${page}:`, data); // 데이터 확인
            
            if (data.length === 0) {
                setHasMoreData(false); // 데이터가 없으면 더 이상 데이터를 가져오지 않음
            } else {
                setCurrentRent(prevRents => [...prevRents, ...data]);
                setPageNumber(prevPage => prevPage + 1); // 페이지 번호 증가
            }
        } catch (e) {
            console.error('Error fetching rents:', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (hasMoreData) {
            fetchCurrentRent(pageNumber);
        }
    }, [fetchCurrentRent, pageNumber, hasMoreData]);

    // 제품 번호 카운터
    const getProductNumber = (rentIndex, productIndex) => {
        // rentIndex의 모든 제품을 포함하고 현재 제품의 인덱스를 더해 최종 번호를 계산
        let totalProductIndex = 0;
        for (let i = 0; i < rentIndex; i++) {
            totalProductIndex += currentRent[i].products.length;
        }
        return totalProductIndex + productIndex + 1; // 제품 번호는 1부터 시작
    };

    return (
        <div>
            <Nav />
            <div className="content-container">
                <Sidebar />
                <div className='content'>
                    <div className='title'>
                        <h3>미반납 물품 조회</h3>
                    </div>
                    <Table className='custom-table'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>제품명</th>
                                <th>제품 개수</th>
                                <th>사물함 본체</th>
                                <th>반납 예정 일자</th>
                                <th>대여 일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRent.flatMap((rent, rentIndex) => 
                                rent.products.map((product, productIndex) => (
                                    <tr key={`${rentIndex}-${productIndex}`}>
                                        <td>{getProductNumber(rentIndex, productIndex)}</td> {/* 제품 번호 */}
                                        <td>{product.product_name}</td> {/* 제품명 */}
                                        <td>{product.product_cnt}</td> {/* 제품 개수 */}
                                        <td>{product.locker_body}</td> {/* 사물함 본체 */}
                                        <td>{rent.due_dt}</td>
                                        <td>{rent.rent_dt}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>

                    {isLoading && <p>Loading...</p>}

                    <Pagination
                        // currentPage={currentPage}
                        // totalPages={totalPages}
                        // handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotRefund;



// import React, { useState, useEffect, useCallback } from 'react';
// import Sidebar from "./Sidebar";
// import Nav from './Nav';
// import '../../style/RequestItme.css';
// import { Table } from 'react-bootstrap';
// import { getRent } from '../../api/userget';
// import Pagination from "../admin/Pagination";

// const NotRefund = () => {
//     const [currentRent, setCurrentRent] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
//     const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
//     const [isLoading, setIsLoading] = useState(false);
//     const [hasMoreData, setHasMoreData] = useState(true);

//     const fetchCurrentRent = useCallback(async (page) => {
//         setIsLoading(true);
//         try {
//             console.log(`Fetching page ${page}`);
//             const data = await getRent(page, 10, 4); // 4는 유저아이디, 나중에 변수로 바꿀 수 있음
//             console.log(`Fetched data for page ${page}:`, data); // 데이터 확인
            
//             // 데이터가 없는 경우
//             if (data.items.length === 0) {
//                 setHasMoreData(false);
//             } else {
//                 // 총 페이지 수 업데이트
//                 const totalItems = data.totalItems || 0; // API가 totalItems를 반환해야 합니다.
//                 const totalPagesFromResponse = Math.ceil(totalItems / 10);
//                 setTotalPages(totalPagesFromResponse);
//                 setCurrentRent(prevRents => [...prevRents, ...data.items]);
//                 setCurrentPage(page);
//             }
//         } catch (e) {
//             console.error('Error fetching rents:', e);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchCurrentRent(currentPage);
//     }, [fetchCurrentRent, currentPage]);

//     // 페이지 변경 핸들러
//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
//             setCurrentPage(newPage);
//         }
//     };

//     // 제품 번호 카운터
//     const getProductNumber = (rentIndex, productIndex) => {
//         let totalProductIndex = 0;
//         for (let i = 0; i < rentIndex; i++) {
//             totalProductIndex += currentRent[i].products.length;
//         }
//         return totalProductIndex + productIndex + 1; // 제품 번호는 1부터 시작
//     };

//     return (
//         <div>
//             <Nav />
//             <div className="content-container">
//                 <Sidebar />
//                 <div className='content'>
//                     <div className='title'>
//                         <h3>미반납 물품 조회</h3>
//                     </div>
//                     <Table className='custom-table'>
//                         <thead>
//                             <tr>
//                                 <th>No.</th>
//                                 <th>제품명</th>
//                                 <th>제품 개수</th>
//                                 <th>사물함 본체</th>
//                                 <th>반납 예정 일자</th>
//                                 <th>대여 일자</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentRent.flatMap((rent, rentIndex) => 
//                                 rent.products.map((product, productIndex) => (
//                                     <tr key={`${rentIndex}-${productIndex}`}>
//                                         <td>{getProductNumber(rentIndex, productIndex)}</td> {/* 제품 번호 */}
//                                         <td>{product.product_name}</td> {/* 제품명 */}
//                                         <td>{product.product_cnt}</td> {/* 제품 개수 */}
//                                         <td>{product.locker_body}</td> {/* 사물함 본체 */}
//                                         <td>{rent.dueDate}</td>
//                                         <td>{rent.rent_dt}</td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </Table>

//                     {isLoading && <p>Loading...</p>}

//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         handlePageChange={handlePageChange}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotRefund;
