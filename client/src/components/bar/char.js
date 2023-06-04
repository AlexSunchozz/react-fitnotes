import React, { useEffect, useState } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const ChartComponent = ({filter, setFilter, labels, values}) => {

  labels= labels.sort((a, b) => {
    const dateA = new Date(a.split('.').reverse().join('-'));
    const dateB = new Date(b.split('.').reverse().join('-'));
    return dateA - dateB;
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Data',
        data: values,
        backgroundColor: 'green',
        borderColor: '#c43def',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Использовать линейную шкалу для оси x
      },
      y: {
        type: 'linear', // Использовать линейную шкалу для оси y
      },
    },
    elements: {
      line: {
        fill: true, // Включить заливку
      },
    },
  };
  

  return (
    <>
      <div className="types pe-4 ps-4 mb-4 mt-4 pb-4" style={{borderBottom:'1px solid #d2d2d2'}}>
          <select name="diagram" id="diagram" style={{width:'100%', height:'30px',
                  backgroundColor:'transparent',color:'white', fontSize:'18px'}}
                  onChange={handleFilterChange}>
              <option value="Макс. вес">Макс. вес</option>
              <option value="Макс. число повторений">Макс. число повторений</option>
          </select>
      </div>
      <div className="graphic p-3">
        <Line
          data={data}
          options={options}
        />
      </div>
    </>

    
  );
};
export default ChartComponent;