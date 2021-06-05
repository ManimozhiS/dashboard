//voltage(line_to_line)_vs_timestamp- has graphs for v_ab,v_bc,v_ca,v_ll_avg vs timestamp

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Voltage_vs_timestamp = () => {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let voltage_ab = [];
    let voltage_bc = [];
    let voltage_ca = [];
    let voltage_avg = [];
    let timestamp = [];
    axios
      .get(" http://localhost:3000/register_values_em6400")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          voltage_ab.push(parseInt(dataObj.v_ab));
          voltage_bc.push(parseInt(dataObj.v_bc));
          voltage_ca.push(parseInt(dataObj.v_ca));
          voltage_avg.push(parseInt(dataObj.v_ll_avg))
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels:timestamp,
          datasets: [
            {
              label: "v_ab vs time",
              data: voltage_ab,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 4
            },
            {
              label: "v_bc vs time",
              data: voltage_bc,
              fill:false,
              borderColor:"orange",
              backgroundColor:"orange",
              borderWidth: 4
            },
            {
              label: "v_ca vs time",
              data: voltage_ca,
              fill:false,
              borderColor: "#742774",
              backgroundColor: "#742774",
              borderWidth: 4
            },
            {
              label: "v_ll_avg vs time",
              data: voltage_avg,
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
      <h1>Voltages_ll_vs_Timestamp</h1>
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

export default Voltage_vs_timestamp;