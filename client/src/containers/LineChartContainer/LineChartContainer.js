import React from 'react';
import PropTypes from 'prop-types';

import LineChart from '../../components/LineChart/LineChart';

function LineChartContainer(props) {
  const { data, config } = props;
  return (
    <div>
      <LineChart data={data} settings={config} />
    </div>
  );
}

LineChartContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default LineChartContainer;
