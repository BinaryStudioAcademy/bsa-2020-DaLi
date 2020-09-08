// eslint-disable-next-line
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { SignUp } from '../../components';

const mapPropsToValues = ({ firstName, lastName, email, password, confirmPassword, companyName }) => {
  return {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    password: password || '',
    confirmPassword: confirmPassword || '',
    companyName: companyName || '',
  };
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter')
    .matches(/^.[a-zA-Z_]+$/, 'Letters only')
    .max(30),
  lastName: Yup.string()
    .required('Required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter')
    .matches(/^.[a-zA-Z_]+$/, 'Letters only')
    .max(30),
  email: Yup.string().max(30).email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .required('Enter your password')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(30)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-!$%^&*()_+|~=:;<>?,#@.])[A-Za-z\d-!$%^&*()_+|~=:;<>?,#@.]{8,}$/,
      'Password must contain one uppercase, one lowercase, one number and one special character.'
    ),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .max(30)
    .oneOf([Yup.ref('password')], 'Password does not match'),
  companyName: Yup.string(),
});

const handleSubmit = (values, { props }) => {
  props.handleSubmitRegister(values);
};

const SignUpContainer = withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(SignUp);

export default SignUpContainer;
