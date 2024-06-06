import React, { useRef, useEffect, useState } from 'react';
import { LineController, LineElement, CategoryScale, Chart, Filler, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import 'chart.js/auto';
import { useSelector } from 'react-redux';

Chart.register(
  LineController,
  LineElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

const PostGraph = () => {
    const { postData } = useSelector(state => state.admin);
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: postData.labels,
                datasets: [{
                    label: 'Number of post per day',
                    data: postData.data,
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
                    tension: 0.1,
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

        chartRef.current.width = 800; // Set canvas width
        chartRef.current.height = 400; // Set canvas height

        chartInstance.resize();

        return () => {
            chartInstance.destroy();
        };  
    }, [postData]);

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <canvas ref={chartRef} />
        </div>
    );
};

export default PostGraph;
