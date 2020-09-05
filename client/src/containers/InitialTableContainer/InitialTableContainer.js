import React from 'react';
import PropTypes from 'prop-types';
import { InitialTable } from '../../components/index';

const InitialTableContainer = (props) => {
  const { data, config, schema } = props;
  return <InitialTable data={data} config={config} schema={schema} />;
};

InitialTableContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  schema: PropTypes.array,
};

export default InitialTableContainer;
