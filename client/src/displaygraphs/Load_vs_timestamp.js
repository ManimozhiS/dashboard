//load vs time - active_pow_a,active_pow_b,active_pow_c,active_pow_total vs time


import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Load_vs_timestamp = () => {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let load_a = [];
    let load_b = [];
    let load_c = [];
    let load_tot = [];
    let timestamp = [];
    axios
      .get(" http://localhost:3000/register_values_em6400")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          load_a.push(parseInt(dataObj.active_pow_a));
          load_b.push(parseInt(dataObj.active_pow_b));
          load_c.push(parseInt(dataObj.active_pow_c));
          load_tot.push(parseInt(dataObj.active_pow_tot))
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels:timestamp,
          datasets: [
            {
              label: "kWh(A) vs time",
              data: load_a,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1
            },
            {
              label: "kWh(B) vs time",
              data: load_b,
              fill:false,
              borderColor:"orange",
              backgroundColor:"orange",
              borderWidth: 1
            },
            {
              label: "kWh(C) vs time",
              data: load_c,
              fill:false,
              borderColor: "#742774",
              backgroundColor: "#742774",
              borderWidth: 1
            },
            {
              label: "kWh(total) vs time",
              data: load_tot,
              fill:false,
              borderColor:"green",
              backgroundColor:"green",
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
      <h1>Load_vs_Timestamp</h1>
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

export default Load_vs_timestamp;