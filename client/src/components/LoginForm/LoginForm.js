/* eslint-disable */

import React from 'react';
import * as Yup from 'yup';
import './styles.css';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain one uppercase, one lowercase, one number and one special character.',
    ),
});

const getStyles = (errors, fieldName) => {
  if (getIn(errors, fieldName)) {
    return {
      border: '1px solid red',
    };
  }
};

const LoginForm = ({ setIsModalVisible, login }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={SignInSchema}
    onSubmit={(values) => login(values)}
  >
    {({ errors, touched }) => (
      <Form>
        <div className="email-wrapper">
          <label htmlFor="email">Email address</label>
          <Field
            type="email"
            name="email"
            className="textInput"
            placeholder="youlooknicetoday@email.com"
            style={getStyles(errors, 'email')}
          />
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className="password-wrapper">
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            name="password"
            className="textInput"
            placeholder="Shhh..."
            style={getStyles(errors, 'password')}
          />
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <div className="checkbox-wrapper">
          <label htmlFor="remember">Remember me</label>
          <Field type="checkbox" name="remember" className="checkbox" />
        </div>
        <div className="btn-wrapper">
          <button type="submit" className="btn btn-submit">
            Sign in
          </button>
          <button type="button" className="forgot-pswd" onClick={() => setIsModalVisible(true)}>
            I seem to have forgotten my password
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
