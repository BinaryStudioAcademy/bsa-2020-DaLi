import React from 'react';
import MaterialRadio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';

const Radio = ({ ...attrs }) => {
  return <MaterialRadio {...attrs} />;
};

Radio.propTypes = {
  attrs: PropTypes.array,
};

export default Radio;
