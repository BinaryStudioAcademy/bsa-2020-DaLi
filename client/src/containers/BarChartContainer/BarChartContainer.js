/* eslint-disable */
import React, { Component } from "react";
import { BarChart } from "../../components";
import { orders } from "../../mock_orders";
import { stacking } from "./types";
import "./BarChartContainer.css";

class BarChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: orders,
      settings: {
        axisData: {
          XAxis: {
            key: 'createdAt',
            label: 'Total',
            displayLabel: true,
          },
          YAxis: {
            key: 'total',
            label: 'Date',
            displayLabel: true,
          },
        },
        chart: {
          margin: {
            top: 40,
            right: 40,
            bottom: 60,
            left: 60,
          },
          height: 600,
          width: 1000,
        },
        display: {
          stacking: stacking.notStack,
          goal: {
            display: true,
            value: 1400,
            label: 'Goal',
          },
          showTrendLine: false,
          showDataPointsValues: true,
        },
      },
    };
  }

  render() {
    const { data, settings } = this.state;
    return (
      <div>
        <BarChart data={data} settings={settings} />
      </div>
    );
  }
}

export default BarChartContainer;
