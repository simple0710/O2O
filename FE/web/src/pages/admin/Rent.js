import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Statistics.css";
// import "../../style/RentStatistics.css"
import axiosInstance from '../../utils/axiosInstance'

const RentStatistics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/usage/analysis/rent-count") // 좌측 하단 데이터 경로
      .then((response) => {
        console.log(response.data.data);
        const products = response.data.data.products;
        console.log(products)
        // 데이터를 대여 횟수로 정렬 (내림차순)
        products.sort((a, b) => b.rent_cnt - a.rent_cnt);

        setData(products);
      })
      .catch((error) => console.error("Failed to load data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="in-chart">
      <h3>대여 횟수 통계</h3>
      <table>
        <thead>
          <tr>
            <th>제품명</th>
            <th>대여 횟수</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_nm}</td>
              <td>{product.rent_cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentStatistics;
