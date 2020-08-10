import React, { Component } from 'react';

import { orders } from '../../mock_orders';
import LineChart from '../../components/LineChart/LineChart';
import { lineType } from './types';

class LineChartContainer extends Component {
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
          goal: {
            display: true,
            value: 100,
            label: 'Goal',
          },
          color: '#4aa1de',
          lineType: lineType.natural,
          showTrendLine: true,
          showDataPointsValues: true,
        },
      },
    };
  }

  render() {
    const { data, settings } = this.state;
    return (
      <div>
        <LineChart data={data} settings={settings} />
      </div>
    );
  }
}

export default LineChartContainer;
