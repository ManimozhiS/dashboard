import React, { Component } from "react";
import "../node_modules/react-vis/dist/style.css";
import Voltage_vs_timestamp from "./displaygraphs/Voltage_vs_timestamp.js";
import Current_vs_timestamp from "./displaygraphs/Current_vs_timestamp.js";
import Voltage2_vs_timestamp from "./displaygraphs/Voltage2_vs_timestamp.js";
import Load_vs_timestamp from "./displaygraphs/Load_vs_timestamp";
import Thd_V_vs_timestamp from "./displaygraphs/Thd_V_vs_timestamp";
import Thd_I_vs_timestamp from "./displaygraphs/Thd_I_vs_timestamp";
import Powerfactor_vs_timestamp from "./displaygraphs/Powerfactor_vs_timestamp";
import Connection3 from "./Connection3.js";
import Frequency_vs_Timestamp from "./displaygraphs/Frequency_vs_timestamp";
import axios from "axios";
import Dropdown from "./Dropdown";
import Card2 from "./Cards/Card2.js";

import "./App.css";

import Header from "./Header";


class App extends Component {
  state = {
    value: false,
    data: [],
  };

  inputdata = () => {
    axios
      .get("http://localhost:3000/register_values_em6400")
      .then((res) => {
        //console.log(res);
        let data1 = [];
        for (const dataObj of res.data) {
          let temp = { x: "", y: "" };
          temp.x = parseInt(dataObj.i_b);
          temp.y = parseInt(dataObj.v_bc);
          data1.push(temp);
        }
        this.setState({ data: data1, value: false });
        console.log(data1);
      })
      .catch((err) => {
        console.log(err);
      });

  };
  componentDidMount = () => {
    this.inputdata();
  };

  render() {
    
    return (
      <div className="App" style={{backgroundColor: ""}} >
        <Header />
        <Card2 />
      <div className="current">
        <Current_vs_timestamp />
        <Dropdown />
      </div>
      <div className="voltage">
        <Voltage_vs_timestamp />
      </div>
      <div className="voltage2">
        <Voltage2_vs_timestamp />
      </div> 
      <div className="powerfactor">
        <Powerfactor_vs_timestamp />
      </div>
      <div className="load">
        <Load_vs_timestamp />
      </div>
      <div className="frequency">
        <Frequency_vs_Timestamp />
      </div>
      <div className="Thd">
        <Thd_V_vs_timestamp />
      </div>
      <div className="thd">
      <Thd_I_vs_timestamp />
      </div>

      </div>
    );
  }
}
export default App;
