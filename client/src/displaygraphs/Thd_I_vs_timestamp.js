//thd_I- has graphs for thd_i_a,thd_i_b,thd_i_c vs timestamp

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Thd_I_vs_timestamp = () => {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let thd_i_a = [];
    let thd_i_b = [];
    let thd_i_c = [];
    
    let timestamp = [];
    axios
      .get(" http://localhost:3000/register_values_em6400")
      .then(res => {
        //console.log(res);
        for (const dataObj of res.data) {
          thd_i_a.push(parseInt(dataObj.thd_i_a));
          thd_i_b.push(parseInt(dataObj.thd_i_b));
          thd_i_c.push(parseInt(dataObj.thd_i_c));
          
          timestamp.push(dataObj.timestamp);
        }
        setChartData({
          labels:timestamp,
          labelString:'timestamp',
          datasets: [
            {
              label: "thd_i_a vs time",
              data: thd_i_a,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1
            },
            {
              label: "thd_i_b vs time",
              data: thd_i_b,
              fill:false,
              borderColor:"orange",
              backgroundColor:"orange",
              borderWidth: 1
            },
            {
              label: "thd_i_c vs time",
              data: thd_i_c,
              fill:false,
              borderColor: "#742774",
              backgroundColor: "#742774",
              borderWidth: 1
            },                       
          ],
         

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
      <h1>%_vs_Time_for_current</h1>
      <div>
        <Line data={chartData}  />
      </div>
    </div>
  );
};

export default Thd_I_vs_timestamp;