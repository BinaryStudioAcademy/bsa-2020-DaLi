import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../../components/LineChart/LineChart';

const LineChartContainer = ({ config, data }) => {
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
      <LineChart data={data} settings={config} chart={chart} />
    </div>
  );
};

LineChartContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.shape({
    axisData: PropTypes.shape({
      XAxis: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        displayLabel: PropTypes.bool,
      }),
      YAxis: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        displayLabel: PropTypes.bool,
      }),
    }),
    chart: PropTypes.shape({
      margin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    display: PropTypes.shape({
      goal: PropTypes.shape({
        display: PropTypes.bool,
        value: PropTypes.number,
        label: PropTypes.string,
      }),
      lineType: PropTypes.string,
      showTrendLine: PropTypes.bool,
      showDataPointsValues: PropTypes.bool,
    }),
  }),
};

LineChartContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default LineChartContainer;
