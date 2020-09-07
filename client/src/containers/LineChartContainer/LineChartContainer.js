import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../../components/LineChart/LineChart';
import { formatDateForSummarize } from '../../helpers/formatDateForSummarize';

const LineChartContainer = ({ config, data }) => {
  // const containerRef = useRef();
  const dataWithFormatDateForSummarize = formatDateForSummarize(data, config);
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
    >
      <LineChart data={dataWithFormatDateForSummarize} settings={config} chart={chart} />
    </div>
  );
};

LineChartContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default LineChartContainer;
