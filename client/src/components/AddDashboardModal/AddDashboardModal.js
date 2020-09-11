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
import { TextField, Typography } from '@material-ui/core';

const ValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
});

// eslint-disable-next-line
const AddDashboardModal = ({ closeModal, addDashboard, isVisible }) => {
  const cancel = (resetForm) => () => {
    resetForm();
    closeModal();
  };
  // eslint-disable-next-line
  const createDashboard = (values) => {
    addDashboard({ ...values, config: null });
    closeModal();
  };
  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h3">New Dashboard</Typography>
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
        initialValues={{ name: '', description: '' }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => createDashboard(values)}
      >
        {/* eslint-disable-next-line */}
        {(props) => <MyForm cancel={cancel} {...props} />}
      </Formik>
    </Dialog>
  );
};

const MyForm = ({ handleSubmit, resetForm, isValid, dirty, cancel, errors, touched }) => (
  <Form onSubmit={handleSubmit}>
    <DialogContent>
      <Typography variant="subtitle2">Name</Typography>
      <Field
        name="name"
        as={TextField}
        required
        id="outlined-required"
        variant="outlined"
        placeholder="What is the name of your dashboard?"
        style={touched.name && errors.name ? { borderRadius: '5px', backgroundColor: 'rgba(255, 0, 0, 0.3)' } : {}}
      />
      <Typography variant="subtitle2">Description</Typography>
      <Field
        name="description"
        as={TextField}
        id="outlined-multiline-static"
        multiline
        rows={6}
        variant="outlined"
        placeholder="It`s optional but oh, so helpful"
      />
    </DialogContent>
    <MuiDialogActions>
      <Button onClick={cancel(resetForm)} size="small" variant="outlined">
        Cancel
      </Button>
      <Button type="submit" size="small" variant="contained" color="primary" disabled={!(isValid && dirty)}>
        Create
      </Button>
    </MuiDialogActions>
  </Form>
);

AddDashboardModal.propTypes = {
  closeModal: PropTypes.func,
  addDashboard: PropTypes.func,
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

export default AddDashboardModal;
