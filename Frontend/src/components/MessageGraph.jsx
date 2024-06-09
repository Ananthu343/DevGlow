import React, { useRef, useEffect } from 'react';
import { BarController, BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import 'chart.js/auto';
import { useSelector } from 'react-redux';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

const MessageGraph = () => {
    const {messageData} = useSelector(state => state.admin)
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels:messageData.labels,
        datasets: [{
          label: 'Personal Messages',
          data: messageData.data,
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
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    chartInstance.resize();

    return () => {
      chartInstance.destroy();
    };
  }, [messageData]);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MessageGraph;
