import React from 'react';
import PropTypes from 'prop-types';
import { InitialTable } from '../../components/index';

const InitialTableContainer = (props) => {
  const { data } = props;
  return <InitialTable data={data} />;
};

InitialTableContainer.propTypes = {
  data: PropTypes.array,
};

export default InitialTableContainer;
