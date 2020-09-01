import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';

import './styles.css';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName) ? { border: '1px solid red' } : {};
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
          <div className="email-wrapper">
            <label htmlFor="login-email">Email address</label>
            <Field
              type="email"
              name="email"
              id="login-email"
              className="textInput"
              placeholder="youlooknicetoday@email.com"
              style={getStyles(errors, touched, 'email')}
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="password-wrapper">
            <label htmlFor="login-password">Password</label>
            <Field
              type="password"
              name="password"
              id="login-password"
              className="textInput"
              placeholder="Shhh..."
              style={getStyles(errors, touched, 'password')}
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="checkbox-wrapper">
            <label htmlFor="rememberMe">Remember me</label>
            <Field type="checkbox" name="rememberMe" className="checkbox" id="login-rememberMe" />
          </div>
          <div className="btn-wrapper">
            <button type="submit" className="btn btn-submit" disabled={!(isValid && dirty)} id="login-signIn">
              Sign in
            </button>
            <button
              type="button"
              className="forgot-pswd"
              onClick={() => setIsModalVisible(true)}
              id="login-forgot-pswd"
            >
              I seem to have forgotten my password
            </button>
          </div>
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
