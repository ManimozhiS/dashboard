//frequency vs time - frequency vs time


import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Frequency_vs_timestamp = () => {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let frequency = [];
    let timestamp = [];
    axios
      .get(" http://localhost:3000/register_values_em6400")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          
          frequency.push(parseInt(dataObj.frequency))
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels:timestamp,
          datasets: [
            {
              label: "frequency vs time",
              
              data: frequency,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    //console.log(current2, voltage2);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="linechart2">
      <h1>Frequency_vs_Timestamp</h1>
      <div>
        <Line data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default Frequency_vs_timestamp;