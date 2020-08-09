import React from 'react';
import MaterialSelect from '@material-ui/core/Select';
import PropTypes from 'prop-types';

const Select = ({ children, ...attrs }) => {

  return (
    <MaterialSelect {...attrs}>
      {children}
    </MaterialSelect>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  attrs: PropTypes.array,
};

export default Select;