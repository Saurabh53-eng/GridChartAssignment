import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);

const BarChart = () => {
  const [chart, setChart] = useState([])
  var baseUrl = "http://localhost:5000/api/v1/fetchallEmployees";

  useEffect(() => {
    const fetchallEmployees = async () => {
      // API Call 
      const response = await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json()
      setChart(json)
    };
    fetchallEmployees()
  }, [baseUrl])



  var data = {
    labels: chart?.map(x => x.employee_name),
    datasets: [{
      label: `${chart?.length} Employees Available`,
      data: chart?.map(x => x.employee_salaryinMonth),
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
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 30,

      },
    },

  }

  return (
    <div>
      <Link to='/'>
        <button>Go back to Grid</button>
      </Link>
      <div style={{ minWidth: "650px" }}>
        <Bar
          data={data}
          height={400}
          options={options}
        />
      </div>
    </div>
  )
}

export default BarChart