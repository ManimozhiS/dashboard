//voltage(line_to_nuetral)_vs_timestamp- has graphs for v_an,v_bn,v_cn,v_ln_avg vs timestamp

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Voltage2_vs_timestamp = () => {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let voltage_an = [];
    let voltage_bn = [];
    let voltage_cn = [];
    let voltage_ln_avg = [];
    let timestamp = [];
    axios
      .get(" http://localhost:3000/register_values_em6400")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          voltage_an.push(parseInt(dataObj.v_an));
          voltage_bn.push(parseInt(dataObj.v_bn));
          voltage_cn.push(parseInt(dataObj.v_cn));
          voltage_ln_avg.push(parseInt(dataObj.v_ln_avg))
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels:timestamp,
          datasets: [
            {
              label: "v_an vs time",
              data: voltage_an,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 4
            },
            {
              label: "v_bn vs time",
              data: voltage_bn,
              fill:false,
              borderColor:"orange",
              backgroundColor:"orange",
              borderWidth: 4
            },
            {
              label: "v_cn vs time",
              data: voltage_cn,
              fill:false,
              borderColor: "#742774",
              backgroundColor: "#742774",
              borderWidth: 4
            },
            {
              label: "v_ln avg vs time",
              data: voltage_ln_avg,
              fill:false,
              borderColor:"green",
              backgroundColor:"green",
              borderWidth: 4
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
      <h1>Voltages_ln_vs_Timestamp</h1>
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

export default Voltage2_vs_timestamp;