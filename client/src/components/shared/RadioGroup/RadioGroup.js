import React from 'react';
import MaterialRadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';

const RadioGroup = ({ children, ...attrs }) => {
  return <MaterialRadioGroup {...attrs}>{children}</MaterialRadioGroup>;
};

RadioGroup.propTypes = {
  children: PropTypes.node,
  attrs: PropTypes.array,
};

export default RadioGroup;
