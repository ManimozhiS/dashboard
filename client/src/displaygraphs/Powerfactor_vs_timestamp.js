//powerfactor vs time - pf_a,pf_b,pf_c,pf_total vs time


import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Powerfactor_vs_timestamp = () => {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let pf_a = [];
    let pf_b = [];
    let pf_c = [];
    let pf_tot = [];
    let timestamp = [];
    axios
      .get(" http://localhost:3000/register_values_em6400")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          pf_a.push(parseInt(dataObj.pf_a));
          pf_b.push(parseInt(dataObj.pf_b));
          pf_c.push(parseInt(dataObj.pf_c));
          pf_tot.push(parseInt(dataObj.pf_tot))
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels:timestamp,
          datasets: [
            {
              label: "pf_a vs time",
              data: pf_a,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1
            },
            {
              label: "pf_b vs time",
              data: pf_b,
              fill:false,
              borderColor:"orange",
              backgroundColor:"orange",
              borderWidth: 1
            },
            {
              label: "pf_c vs time",
              data: pf_c,
              fill:false,
              borderColor: "#742774",
              backgroundColor: "#742774",
              borderWidth: 1
            },
            {
              label: "pf_tot vs time",
              data: pf_tot,
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
      <h1>Powerfactor_vs_Timestamp</h1>
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

export default Powerfactor_vs_timestamp;