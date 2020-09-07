import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Button, Typography, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, Field, getIn } from 'formik';
import PropTypes from 'prop-types';

import './styles.css';
import PasswordModal from '../PasswordModal/PasswordModal';

const ValidationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(10, 'First name must be at most 30 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(10, 'Last name must be at most 30 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName)
    ? { borderRadius: '5px', backgroundColor: 'rgba(255, 0, 0, 0.3)' }
    : {};
};

const AddUserModal = ({ closeModal, submitHandler, isVisible, user }) => {
  const [passwordModalVisible, setPasswordModalVisible] = React.useState(false);

  const cancel = (resetForm) => () => {
    resetForm();
    closeModal();
  };

  const handleSubmit = (values) => {
    closeModal();
    if (user) {
      submitHandler({ id: user.id, data: values });
    } else {
      submitHandler(values);
    }
  };

  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };
  const closePasswordModal = () => {
    setPasswordModalVisible(false);
  };

  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h3">{user ? 'Edit user' : 'New user'}</Typography>
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: 'absolute', top: 20, right: 24 }}
          onClick={closeModal}
        >
          <CloseIcon style={{ fontSize: 18, color: '#c6cfd4' }} />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={
          user
            ? { firstName: user.firstName, lastName: user.lastName, email: user.email }
            : { firstName: '', lastName: '', email: '' }
        }
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => <AddUserForm openPasswordModal={openPasswordModal} editMode={!!user} cancel={cancel} {...props} />}
      </Formik>
      <PasswordModal open={passwordModalVisible} closePasswordModal={closePasswordModal} />
    </Dialog>
  );
};

const AddUserForm = ({ resetForm, isValid, dirty, cancel, errors, touched, editMode }) => {
  return (
    <Form className="add-user-form">
      <DialogContent>
        <Typography variant="subtitle2">First name</Typography>
        <Field
          name="firstName"
          as={TextField}
          variant="outlined"
          placeholder="Johnny"
          style={getStyles(errors, touched, 'firstName')}
        />
        <ErrorMessage name="firstName" component="div" className="error" />
        <Typography variant="subtitle2">Last name</Typography>
        <Field
          name="lastName"
          as={TextField}
          variant="outlined"
          placeholder="Appleseed"
          style={getStyles(errors, touched, 'lastName')}
        />
        <ErrorMessage name="lastName" component="div" className="error" />
        <Typography variant="subtitle2">Email</Typography>
        <Field
          name="email"
          as={TextField}
          variant="outlined"
          placeholder="youlooknicetoday@email.com"
          style={getStyles(errors, touched, 'email')}
        />
        <ErrorMessage name="email" component="div" className="error" />
      </DialogContent>
      <MuiDialogActions>
        <Button onClick={cancel(resetForm)} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={isValid && !dirty}>
          {editMode ? 'Update' : 'Create'}
        </Button>
      </MuiDialogActions>
    </Form>
  );
};

AddUserModal.propTypes = {
  closeModal: PropTypes.func,
  addUser: PropTypes.func,
  isVisible: PropTypes.bool,
  submitHandler: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
};

AddUserForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
  editMode: PropTypes.bool,
};

export default AddUserModal;
