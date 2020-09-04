/* eslint-disable */
import React from 'react';
import { BarChart } from '../../components';
import PropTypes from 'prop-types';
import {formatDateForSummarize} from "../../helpers/formatDateForSummarize";

function BarChartContainer({ data, config }) {
  const dataWithFormatDateForSummarize = formatDateForSummarize(data, config)
  const chart = {
    margin: {
      top: 40,
      right: 40,
      bottom: 60,
      left: 60,
    },
    height: 600,
    width: 1000,
  };

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
      }}
      id="barChartVisualizationContainer"
    >
      <BarChart data={dataWithFormatDateForSummarize} settings={config} chart={chart} />
    </div>
  );
}

BarChartContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default BarChartContainer;
