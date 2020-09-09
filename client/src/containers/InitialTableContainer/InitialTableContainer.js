import React from 'react';
import PropTypes from 'prop-types';
import { InitialTable } from '../../components/index';

const InitialTableContainer = (props) => {
  const { data, config } = props;
  return data.length ? <InitialTable data={data} config={config} /> : 'There is no data to show';
};

InitialTableContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  schema: PropTypes.array,
};

export default InitialTableContainer;
