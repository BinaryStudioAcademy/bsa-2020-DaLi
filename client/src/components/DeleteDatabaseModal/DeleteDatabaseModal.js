import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import HINT_WORD from './constants';

import './styles.css';

const ValidationSchema = Yup.object({
  hintWord: Yup.string().max(6)
});

const useStyles = makeStyles({
  deleteButton: {
    color: 'white',
    textTransform: 'none',
    background: 'red',
    '&:hover': {
      background: 'red',
    },
    borderRadius: '5px',
    marginRight: '20px',
  },
});

const DeleteDatabaseModal = ({ isVisible, closeModal }) => {
  const cancel = (resetForm) => () => {
    resetForm();
    closeModal();
  };

  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>Delete this database?</DialogTitle>
      <Formik initialValues={{ hintWord: '' }} ValidationSchema={ValidationSchema}>
        {/* eslint-disable-next-line */}
        {(props) => <MyForm cancel={cancel} {...props} />}
      </Formik>
    </Dialog>
  );
};

const MyForm = ({ handleSubmit, resetForm, isValid, dirty, cancel, errors, touched }) => {
  const classes = useStyles();

  const validateHintWord = (value) => {
    let error;
    if (value !== HINT_WORD) {
      error = 'It is not the hint word';
    }
    return error;
  };

  return (
    <Form className="visualizationModalForm" onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>
          If you're sure, please type <strong>{HINT_WORD}</strong> in this box:
        </DialogContentText>
        <Field
          name="hintWord"
          as="input"
          maxlength={6}
          validate={validateHintWord}
          style={touched.hintWord && errors.hintWord ? { borderColor: 'red' } : {}}
        />
        <span className="errorMessage">{touched.hintWord && errors.hintWord}</span>
      </DialogContent>
      <MuiDialogActions className="visualizationModalFooter">
        <Button onClick={cancel(resetForm)} variant="outlined" style={{ textTransform: 'none', fontSize: 12 }}>
          Cancel
        </Button>
        <Button
          className={classes.deleteButton}
          type="submit"
          variant="contained"
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
};

export default DeleteDatabaseModal;
