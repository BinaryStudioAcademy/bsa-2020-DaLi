import React from 'react';
import PropTypes from 'prop-types';
import { InitialTable } from '../../components/index';

const InitialTableContainer = (props) => {
  const { data, schema } = props;
  return <InitialTable data={data} schema={schema} />;
};

InitialTableContainer.propTypes = {
  data: PropTypes.array,
  schema: PropTypes.array,
};

export default InitialTableContainer;
