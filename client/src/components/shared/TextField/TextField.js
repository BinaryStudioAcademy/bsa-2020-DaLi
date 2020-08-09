import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const TextField = ({ children, ...attrs }) => {

  return (
    <MaterialTextField {...attrs}>
      {children}
    </MaterialTextField>
  );
};

TextField.propTypes = {
  children: PropTypes.node,
  attrs: PropTypes.array,
};

export default TextField;