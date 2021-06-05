//current_vs_timestamp- has graphs for i_a,i_b,i_c,i_avg vs timestamp

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./timestamp.css";

function Current_vs_timestamp() {

  const [chartData, setChartData] = useState({});
 
  const chart = () => {
    let current_a = [];
    let current_b = [];
    let current_c = [];
    let current_n = [];
    let timestamp = [];
    axios
      .get("http://localhost:3000/register_values_em6400?option=1")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          current_a.push(parseInt(dataObj.i_a));
          current_b.push(parseInt(dataObj.i_b));
          current_c.push(parseInt(dataObj.i_c));
          current_n.push(parseInt(dataObj.i_avg));
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels: timestamp,
          scales: {
            xAxes: [{
              display: true,
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: 'red'
              },
              scaleLabel: {
                display: true,
                labelString: "timestamp",
                fontColor: 'green'
              }
            }]
          },
          datasets: [
            {
              label: "i_a vs time",
              data: current_a,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1
            },
            {
              label: "i_b vs time",
              data: current_b,
              fill: false,
              borderColor: "orange",
              backgroundColor: "orange",
              borderWidth: 1
            },
            {
              label: "i_c vs time",
              data: current_c,
              fill: false,
              borderColor: "#742774",
              backgroundColor: "#742774",
              borderWidth: 1
            },
            {
              label: "i_avg vs time",
              data: current_n,
              fill: false,
              borderColor: "green",
              backgroundColor: "green",
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
    <div className="Appline">
      <h1>Current_vs_Timestamp</h1>
      <div>
        <Line data={chartData}

          options={{
            responsive: true,

            scales: {
              yAxes: [
                {
                  display: true,
                  labelString: 'probability',

                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: true
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
          }} />
      </div>
    </div>
  );
}

export default Current_vs_timestamp;