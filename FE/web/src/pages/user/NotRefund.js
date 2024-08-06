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
            console.log(`Fetched data for page ${page}:`, data);
            
            if (data.length === 0) {
                setHasMoreData(false);
            } else {
                setCurrentRent(prevRents => [...prevRents, ...data]);
                setPageNumber(prevPage => prevPage + 1);
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
    const getProductNumber = (index) => {
        // 전체 데이터에서 인덱스 기반 번호 계산
        return index + 1;
    };

    // 데이터를 페이지당 10개씩 나누는 함수
    const paginateData = (data, currentPage, itemsPerPage) => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    };

    // 현재 페이지에 해당하는 데이터
    const itemsPerPage = 10;
    const allProducts = currentRent.flatMap(rent => rent.products);
    const paginatedRent = paginateData(allProducts, pageNumber, itemsPerPage);

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
                            {paginatedRent.map((product, index) => (
                                <tr key={index}>
                                    <td>{getProductNumber((pageNumber - 1) * itemsPerPage + index)}</td>
                                    <td>{product.product_name}</td>
                                    <td>{product.product_cnt}</td>
                                    <td>{product.locker_body}</td>
                                    <td>{product.due_dt}</td>
                                    <td>{product.rent_dt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {isLoading && <p>Loading...</p>}

                    <Pagination
                        currentPage={pageNumber}
                        totalPages={Math.ceil(allProducts.length / itemsPerPage)}
                        handlePageChange={page => setPageNumber(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotRefund;
