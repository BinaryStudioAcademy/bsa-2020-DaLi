import React, { Component } from 'react';
import * as d3 from 'd3'
import { orders } from '../../mock_orders';
import LineChart from '../../components/LineChart/LineChart';

class LineChartContainer extends Component {
  state = {
    data: orders,
    settings: {
      axisData: {
        XAxis: {
          key: "createdAt",
          label: "Total",
          displayLabel: true,
        },
        YAxis: {
          key: "total",
          label: "Date",
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
        goal: {
          display: true,
          value: 100,
          label: "Goal",
        },
        showTrendLine: false,
        showDataPointsValues: true,
      },
    }
  }

  render() {
    return (
      <div>
        <LineChart 
          data={this.state.data}
          settings={this.state.settings}
        />
      </div>
    );
  }
};

export default LineChartContainer;