import React from 'react';
import PropTypes from 'prop-types';
import { InitialTable } from '../../components/index';

const InitialTableContainer = (props) => {
  const { data, config } = props;
  return <InitialTable data={data} config={config} />;
};

InitialTableContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default InitialTableContainer;
