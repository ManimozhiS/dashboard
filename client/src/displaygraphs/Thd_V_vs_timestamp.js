//thd_V- has graphs for thd_v_an,thd_v_bn,thd_v_cn vs timestamp

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Thd_V_vs_timestamp = () => {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let thd_v_an = [];
    let thd_v_bn = [];
    let thd_v_cn = [];
    
    let timestamp = [];
    axios
      .get(" http://localhost:3000/register_values_em6400")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          thd_v_an.push(parseInt(dataObj.thd_v_an));
          thd_v_bn.push(parseInt(dataObj.thd_v_bn));
          thd_v_cn.push(parseInt(dataObj.thd_v_cn));
          
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels:timestamp,
          datasets: [
            {
              label: "thd_v_an vs time",
              data: thd_v_an,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 4
            },
            {
              label: "thd_v_bn vs time",
              data: thd_v_bn,
              fill:false,
              borderColor:"orange",
              backgroundColor:"orange",
              borderWidth: 4
            },
            {
              label: "thd_v_cn vs time",
              data: thd_v_cn,
              fill:false,
              borderColor: "#742774",
              backgroundColor: "#742774",
              borderWidth: 4
            },
            
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
      <h1>%_vs_Time_for_voltage</h1>
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

export default Thd_V_vs_timestamp;