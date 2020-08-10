import React from 'react';
import MaterialSwitch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';

const Switch = ({ ...attrs }) => {
  return <MaterialSwitch {...attrs} />;
};

Switch.propTypes = {
  attrs: PropTypes.array,
};

export default Switch;
