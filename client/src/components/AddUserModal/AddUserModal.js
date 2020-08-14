import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

import './styles.css';

const ValidationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required'),
});
// eslint-disable-next-line
const AddUserModal = ({closeModal, addUser, isVisible}) => {

  const cancel = (resetForm) => () => {
    resetForm();
    closeModal();
  };
  // eslint-disable-next-line
  const handleSubmit = (values) => {
    addUser(values);
    closeModal();
  };
  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        New user
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
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {/* eslint-disable-next-line */}
        {(props) => <MyForm cancel={cancel} {...props}/>}
      </Formik>
    </Dialog>
  );
};

const MyForm = ({ resetForm, isValid, dirty, cancel, errors, touched }) => (
  <Form className="visualizationModalForm">
    <DialogContent className="MyFieldContainer">
      <div className="labelsContainer">
        <span>First name</span>
        <p>{touched.firstName && errors.firstName}</p>
      </div>
      <Field
        name="firstName"
        as="input"
        placeholder="Johnny"
        style={touched.firstName && errors.firstName ? { borderColor: 'red' } : {}}
      />
      <div className="labelsContainer">
        <span>Last name</span>
        <p>{touched.lastName && errors.lastName}</p>
      </div>
      <Field
        name="lastName"
        as="input"
        placeholder="Appleseed"
        style={touched.name && errors.name ? { borderColor: 'red' } : {}}
      />
      <div className="labelsContainer">
        <span>Email</span>
        <p>{touched.email && errors.email}</p>
      </div>
      <Field
        name="email"
        as="input"
        placeholder="youlooknicetoday@email.com"
        style={touched.name && errors.name ? { borderColor: 'red' } : {}}
      />
    </DialogContent>
    <MuiDialogActions className="visualizationModalFooter">
      <Button onClick={cancel(resetForm)} variant="outlined" style={{ textTransform: 'none', fontSize: 12 }}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="outlined"
        disabled={isValid && !dirty}
        style={{ textTransform: 'none', fontSize: 12 }}
        // onClick={console.log}
      >
        Create
      </Button>
    </MuiDialogActions>
  </Form>
);

AddUserModal.propTypes = {
  closeModal: PropTypes.func,
  addUser: PropTypes.func,
  isVisible: PropTypes.bool,
};

MyForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
};

export default AddUserModal;
