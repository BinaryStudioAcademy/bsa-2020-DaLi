import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Typography, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import HINT_WORD from './constants';

const ValidationSchema = Yup.object({
  hintWord: Yup.string().max(6),
});

const DeleteDatabaseModal = ({ isVisible, closeModal, deleteDatabase, databaseId }) => {
  const cancel = (resetForm) => () => {
    resetForm();
    closeModal();
  };

  const deleteDb = () => {
    closeModal();
    deleteDatabase(databaseId);
  };

  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h3">Delete this database?</Typography>
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: 'absolute', top: 20, right: 24 }}
          onClick={closeModal}
        >
          <CloseIcon style={{ fontSize: 18, color: '#c6cfd4' }} />
        </IconButton>
      </DialogTitle>
      <Formik initialValues={{ hintWord: '' }} ValidationSchema={ValidationSchema} onSubmit={deleteDb}>
        {/* eslint-disable-next-line */}
        {(props) => <DeleteDatabaseForm cancel={cancel} {...props} />}
      </Formik>
    </Dialog>
  );
};

const DeleteDatabaseForm = ({ handleSubmit, resetForm, isValid, dirty, cancel, errors, touched }) => {
  const validateHintWord = (value) => {
    let error;
    if (value !== HINT_WORD) {
      error = 'This is not the right word';
    }
    return error;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DialogContent style={{ padding: '0 0 10px' }}>
        <Typography variant="subtitle2">
          If you&#39;re sure, please type <strong style={{ color: '#1CD1A1' }}>{HINT_WORD}</strong> in this box:
        </Typography>
        <Field
          as={TextField}
          name="hintWord"
          maxLength={6}
          variant="outlined"
          validate={validateHintWord}
          style={
            touched.hintWord && errors.hintWord ? { borderRadius: '5px', backgroundColor: 'rgba(255, 0, 0, 0.3)' } : {}
          }
        />
        <ErrorMessage name="hintWord" component="div" className="error" />
      </DialogContent>
      <MuiDialogActions style={{ padding: 0, marginTop: '10px' }}>
        <Button onClick={cancel(resetForm)} variant="outlined" style={{ textTransform: 'none', fontSize: 12 }}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!(isValid && dirty)}
          style={{ textTransform: 'none', fontSize: 12 }}
        >
          Delete
        </Button>
      </MuiDialogActions>
    </Form>
  );
};

DeleteDatabaseModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  deleteDatabase: PropTypes.func,
  databaseId: PropTypes.string,
};

DeleteDatabaseForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
};

export default DeleteDatabaseModal;
