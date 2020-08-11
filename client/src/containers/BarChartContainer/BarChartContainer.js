/* eslint-disable */
import React from 'react';
import { BarChart } from '../../components';
import PropTypes from 'prop-types';

function BarChartContainer(props) {
  const { data, config } = props;
  return (
    <div>
      <BarChart data={data} settings={config} />
    </div>
  );
}

BarChartContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default BarChartContainer;
