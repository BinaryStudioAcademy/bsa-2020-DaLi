import React from 'react';
import { Field, useField } from 'formik';
import PropTypes from 'prop-types';

import './styles.css';

export const MyField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`MyFieldContainer ${meta.touched && meta.error ? 'invalid' : 'valid'}`}>
      <div className="labelsContainer">
        {/* eslint-disable-next-line */}
        <label>{label}</label>
        <p>{meta.touched && meta.error}</p>
      </div>
      {/* eslint-disable-next-line */}
      <Field {...props} {...field} />
    </div>
  );
};

MyField.propTypes = {
  label: PropTypes.string,
};
