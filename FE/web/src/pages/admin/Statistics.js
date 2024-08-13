import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Sidebar from "./Sidebar";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"; // 추가
import axios from "axios";
import Rent from "./Rent";
import Usage from "./Usage";
import "../../style/Statistics.css";
import "../../style/Title.css";
import axiosInstance from '../../utils/axiosInstance'
import { ScaleLoader } from 'react-spinners'; // 스피너 컴포넌트 임포트

// 스케일 등록
Chart.register(CategoryScale);

const Statistics = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/usage/analysis/usage-rate")
      .then((response) => {
        console.log(response.data.data);
        const data = response.data.data;
        const productNames = data.products.map((product) => product.product_nm);
        const usageRates = data.products.map((product) => product.usage_rate);

        setChartData({
          labels: productNames,
          datasets: [
            {
              label: "사용률",
              data: usageRates,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("페이지를 표시할 수 없습니다.", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  
  if (!chartData) {
    return <div className='st-spinner'>
    <ScaleLoader color='gray' size={500} />
  </div>;;
  }

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className="title">
            <h3>비품 사용 통계</h3>
          </div>
          <div className="chart-container">
            <h5>[사용률 통계]</h5>
            <Bar data={chartData} options={options} />
          </div>
          <div className="out-chart">
            <Rent />
            <Usage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
