import React, { useRef, useEffect } from 'react';
import { DoughnutController, CategoryScale, Chart, Filler, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import 'chart.js/auto';
import { useSelector } from 'react-redux';

Chart.register(
  DoughnutController,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

const UserGraph = ({ data }) => {
    const {userData} = useSelector(state => state.admin)
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: userData.labels,
        datasets: [{
          label: 'Users',
          data: userData.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        cutout: '80%',
      }
    });

    chartRef.current.width = 400; // Set canvas width
    chartRef.current.height = 200; // Set canvas height

    chartInstance.resize();

    return () => {
      chartInstance.destroy();
    };
  }, [userData]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default UserGraph;
