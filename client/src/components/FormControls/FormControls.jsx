import React from 'react';
import {Field, useField} from 'formik';

import './styles.css';

export const MyField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
      <div className={'MyFieldContainer ' + (meta.touched && meta.error ? 'invalid' : 'valid')}>
        <div className='labelsContainer'>
          <label>{label}</label>
          <p>{meta.touched && meta.error}</p>
        </div>
        <Field {...props} {...field} />
      </div>
  )
};
