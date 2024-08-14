import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import '../../style/RequestItme.css';
import { Table } from 'react-bootstrap';
import { getRent } from '../../api/userget';
import Pagination from "../admin/Pagination";
import { ScaleLoader } from 'react-spinners'; // 스피너 컴포넌트 임포트

const NotRefund = () => {
    const [currentRent, setCurrentRent] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const userId = localStorage.getItem('userId');

    const fetchCurrentRent = useCallback(async (page) => {
        setIsLoading(true);
        try {
            console.log(`Fetching page ${page}`);
            const data = await getRent(page, 10, userId); // userId는 localStorage에서 가져옴
            console.log(`Fetched data for page ${page}:`, data);
            
            if (data.length === 0) {
                setHasMoreData(false);
                setInitialLoadComplete(true);
            } else {
                setCurrentRent(prevRents => [...prevRents, ...data]);
                if (data.length < 10) {
                    setHasMoreData(false);
                    setInitialLoadComplete(true);
                }
            }
        } catch (e) {
            console.error('Error fetching rents:', e);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (hasMoreData) {
            fetchCurrentRent(Math.ceil(currentRent.length / 10) + 1);
        } else if (!initialLoadComplete) {
            setInitialLoadComplete(true);
        }
    }, [hasMoreData, fetchCurrentRent, currentRent.length, initialLoadComplete]);

    // 제품 번호 카운터
    const getProductNumber = (index) => {
        return index + 1;
    };

    // 데이터를 페이지당 10개씩 나누는 함수
    const paginateData = (data, currentPage, itemsPerPage) => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    };

    // 모든 제품과 관련된 렌트 정보 플랫 매핑
    const allProductsWithRentInfo = currentRent.flatMap(rent => 
        rent.products.map(product => ({
            ...product,
            due_dt: rent.due_dt,
            rent_dt: rent.rent_dt
        }))
    );

    // 현재 페이지에 해당하는 데이터
    const itemsPerPage = 10;
    const paginatedRent = paginateData(allProductsWithRentInfo, pageNumber, itemsPerPage);

    const formatDate = (dateString) => {
        // 날짜 문자열을 Date 객체로 변환
        const date = new Date(dateString);
      
        // 연도, 월, 일 추출
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        // 시간과 분 추출
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        // 원하는 형식으로 변환
        return `${year}.${month}.${day}.${hours}:${minutes}`;
      };

    return (
        <div>
            <Nav />
            <div className="content-container">
                <Sidebar />
                <div className='content'>
                    <div className='title'>
                        <h3>대여중인 물품</h3>
                    </div>
                    {isLoading ? (
                        <div className='request-spinner'>
                            <ScaleLoader color='gray' size={50} />
                        </div>
                    ) : (
                        <>
                        <Table className='custom-table'>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>제품명</th>
                                    <th>제품 개수</th>
                                    <th>사물함 본체</th>
                                    <th className="center-align">반납 예정 일자</th>
                                    <th className="center-align">대여 일자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRent.length > 0 ? (
                                    paginatedRent.map((product, index) => (
                                        <tr key={index}>
                                            <td>{getProductNumber((pageNumber - 1) * itemsPerPage + index)}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.product_cnt}</td>
                                            <td>{product.locker_body}</td>
                                            <td className="center-align">{formatDate(product.due_dt)}</td>
                                            <td className="center-align">{formatDate(product.rent_dt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">대여중인 물품이 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        <Pagination
                            currentPage={pageNumber}
                            totalPages={Math.ceil(allProductsWithRentInfo.length / itemsPerPage)}
                            handlePageChange={page => setPageNumber(page)}
                        />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotRefund;
