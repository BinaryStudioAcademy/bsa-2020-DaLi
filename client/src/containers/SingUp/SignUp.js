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
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must contain at least 8 characters').required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
  companyName: Yup.string().required('Enter your company name'),
});

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    // eslint-disable-next-line
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 1000);
};

const SignUpContainer = withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(SignUp);

export default SignUpContainer;
