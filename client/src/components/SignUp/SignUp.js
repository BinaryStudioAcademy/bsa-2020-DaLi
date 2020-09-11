import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage, getIn } from 'formik';
import { Typography } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName)
    ? { borderRadius: '5px', backgroundColor: 'rgba(255, 0, 0, 0.3)' }
    : {};
};

const SignUp = ({ values, touched, errors, handleChange, handleReset, handleSubmit, isValid, dirty }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="subtitle2" htmlFor="firstName">
        First Name
      </Typography>
      <Field
        id="firstName"
        name="firstName"
        placeholder="John"
        as={TextField}
        value={values.firstName}
        onChange={handleChange}
        style={getStyles(errors, touched, 'firstName')}
        variant="outlined"
      />
      <ErrorMessage name="firstName" component="div" className="error" />

      <Typography variant="subtitle2" htmlFor="lastName">
        Last Name
      </Typography>
      <Field
        id="lastName"
        name="lastName"
        placeholder="Doe"
        as={TextField}
        value={values.lastName}
        onChange={handleChange}
        style={getStyles(errors, touched, 'lastName')}
        variant="outlined"
      />
      <ErrorMessage name="lastName" component="div" className="error" />

      <Typography variant="subtitle2" htmlFor="email">
        Email
      </Typography>
      <Field
        id="email"
        name="email"
        placeholder="johndoe@gmail.com"
        as={TextField}
        value={values.email}
        onChange={handleChange}
        style={getStyles(errors, touched, 'email')}
        variant="outlined"
      />
      <ErrorMessage name="email" component="div" className="error" />

      <Typography variant="subtitle2" htmlFor="password">
        Password
      </Typography>
      <Field
        id="password"
        name="password"
        placeholder="P@55word"
        as={TextField}
        type="password"
        value={values.password}
        onChange={handleChange}
        style={getStyles(errors, touched, 'password')}
        variant="outlined"
      />
      <ErrorMessage name="password" component="div" className="error" />

      <Typography variant="subtitle2" htmlFor="confirmPassword">
        Confirm Password
      </Typography>
      <Field
        id="confirmPassword"
        name="confirmPassword"
        placeholder="P@55word"
        as={TextField}
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        style={getStyles(errors, touched, 'confirmPassword')}
        variant="outlined"
      />
      <ErrorMessage name="confirmPassword" component="div" className="error" />

      <Typography variant="subtitle2" htmlFor="companyName">
        Company Name
      </Typography>
      <Field
        id="companyName"
        name="companyName"
        placeholder="BSA"
        as={TextField}
        value={values.companyName}
        onChange={handleChange}
        style={getStyles(errors, touched, 'companyName')}
        variant="outlined"
      />
      <ErrorMessage name="companyName" component="div" className="error" />

      <Button
        style={{ marginTop: 15, marginRight: 10 }}
        type="submit"
        size="large"
        variant="contained"
        disabled={!(isValid && dirty)}
        color="primary"
      >
        Sign up
      </Button>
      <Button style={{ marginTop: 15, marginRight: 10 }} size="large" variant="outlined" onClick={handleReset}>
        Clear
      </Button>
    </form>
  );
};

SignUp.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
};

export default SignUp;
