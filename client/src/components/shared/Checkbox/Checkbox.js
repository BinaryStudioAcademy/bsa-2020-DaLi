import React from 'react';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const Checkbox = ({ ...attrs }) => {
  return <MaterialCheckbox {...attrs} />;
};

Checkbox.propTypes = {
  attrs: PropTypes.array,
};

export default Checkbox;
