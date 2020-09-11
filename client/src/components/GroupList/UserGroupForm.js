import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { useStyles } from './styles';

const ValidationSchema = Yup.object({
  name: Yup.string().required('Name is required').max(30, 'Name must be at most 30 characters'),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName)
    ? { borderRadius: '10px', backgroundColor: 'rgba(255, 0, 0, 0.3)' }
    : {};
};

const UserGroupForm = ({ initialName, submit, closeForm, submitTitle }) => {
  return (
    <TableRow>
      <TableCell colSpan={3}>
        <Formik
          initialValues={{ name: initialName }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => submit(values)}
        >
          {/* eslint-disable-next-line */}
          {(props) => <CreateUserGroupForm cancel={closeForm} submitTitle={submitTitle} {...props} />}
        </Formik>
      </TableCell>
    </TableRow>
  );
};

const CreateUserGroupForm = ({ handleSubmit, resetForm, isValid, dirty, cancel, submitTitle, errors, touched }) => {
  const classes = useStyles();
  return (
    <>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <Field
          name="name"
          as={TextField}
          variant="outlined"
          placeholder='Something like "Marketing"'
          style={getStyles(errors, touched, 'name')}
        />
        <ErrorMessage name="name" component="div" className="errorGroup" />
        <div>
          <Button onClick={cancel(resetForm)} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={!(isValid && dirty)}>
            {submitTitle}
          </Button>
        </div>
      </Form>
    </>
  );
};

UserGroupForm.propTypes = {
  initialName: PropTypes.string,
  submit: PropTypes.func,
  closeForm: PropTypes.func,
  submitTitle: PropTypes.string,
};

CreateUserGroupForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
  submitTitle: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
};

export default UserGroupForm;
