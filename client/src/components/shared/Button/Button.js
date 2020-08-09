import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const Button = ({ children, ...attrs }) => {
  return <MaterialButton {...attrs}>{children}</MaterialButton>;
};

Button.propTypes = {
  children: PropTypes.node,
  attrs: PropTypes.array,
};

export default Button;
