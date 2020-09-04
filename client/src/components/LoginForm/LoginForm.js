import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import Button from '@material-ui/core/Button';

import { Typography, TextField, Checkbox } from '@material-ui/core';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName)
    ? { borderRadius: '5px', backgroundColor: 'rgba(255, 0, 0, 0.3)' }
    : {};
};

const LoginForm = ({ setIsModalVisible, login }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={SignInSchema}
      onSubmit={(values) => login(values)}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          <Typography variant="subtitle2" htmlFor="email">
            Email address
          </Typography>
          <Field
            name="email"
            as={TextField}
            required
            id="outlined-required"
            variant="outlined"
            placeholder="youlooknicetoday@email.com"
            style={getStyles(errors, touched, 'email')}
          />
          <ErrorMessage name="email" component="div" className="error" />
          <div className="password-label-wrapper">
            <Typography variant="subtitle2" htmlFor="password">
              Password
            </Typography>
            <Typography
              variant="caption"
              color="primary"
              className="forgot-pswd"
              onClick={() => setIsModalVisible(true)}
            >
              Forgot password?
            </Typography>
          </div>
          <Field
            id="outlined-password-input"
            type="password"
            name="password"
            as={TextField}
            required
            variant="outlined"
            placeholder="Shhh..."
            style={getStyles(errors, touched, 'password')}
          />
          <ErrorMessage name="password" component="div" className="error" />
          <div className="checkbox-wrapper">
            <label htmlFor="rememberMe" className="login-checkbox-label">
              Remember me
            </label>
            <Field
              as={Checkbox}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              name="rememberMe"
              className="login-checkbox"
            />
          </div>
          <Button type="submit" size="large" variant="contained" color="primary" disabled={!(isValid && dirty)}>
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func,
  setIsModalVisible: PropTypes.func,
};

export default LoginForm;
