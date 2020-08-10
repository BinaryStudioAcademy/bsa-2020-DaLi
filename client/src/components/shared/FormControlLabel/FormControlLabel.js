import React from 'react';
import MaterialFormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

const FormControlLabel = ({ ...attrs }) => {
  return <MaterialFormControlLabel {...attrs} />;
};

FormControlLabel.propTypes = {
  attrs: PropTypes.array,
};

export default FormControlLabel;
