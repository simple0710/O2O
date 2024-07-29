import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Statistics = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/statistics.json')
      .then(response => {
        const data = response.data;
        const productNames = data.products.map(product => product.product_nm);
        const usageRates = data.products.map(product => product.usage_rate);

        setChartData({
          labels: productNames,
          datasets: [
            {
              label: '사용률',
              data: usageRates,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => console.error('페이지를 표시할 수 없습니다.', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!chartData) {
    return <div>Failed to load data</div>;
  }

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h3>물건 사용빈도 통계</h3>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
