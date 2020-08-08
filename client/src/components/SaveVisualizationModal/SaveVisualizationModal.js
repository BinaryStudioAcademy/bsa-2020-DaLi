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
  name: Yup.string().required('Name is required'),
});
// eslint-disable-next-line
const SaveVisualizationModal = ({closeModal, saveVisualization, isVisible}) => {

  const cancel = (resetForm) => () => {
    resetForm();
    closeModal();
  };
  // eslint-disable-next-line
  const save = (values) => {
    saveVisualization(values);
  };
  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        Save visualization
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
        onSubmit={(values) => save(values)}
      >
        {/* eslint-disable-next-line */}
        {(props) => <MyForm cancel={cancel} {...props}/>}
      </Formik>
    </Dialog>
  );
};

const MyForm = ({ handleSubmit, resetForm, isValid, dirty, cancel, errors, touched }) => (
  <Form className="visualizationModalForm" onSubmit={handleSubmit}>
    <DialogContent className="MyFieldContainer">
      <div className="labelsContainer">
        <span>Name</span>
        <p>{touched.name && errors.name}</p>
      </div>
      <Field
        name="name"
        as="input"
        placeholder="What is the name of your card?"
        style={touched.name && errors.name ? { borderColor: 'red' } : {}}
      />
      <div className="labelsContainer">
        <span>Description</span>
      </div>
      <Field name="description" as="textarea" placeholder="It`s optional but oh, so helpful" />
    </DialogContent>
    <MuiDialogActions className="visualizationModalFooter">
      <Button onClick={cancel(resetForm)} variant="outlined" style={{ textTransform: 'none', fontSize: 12 }}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="outlined"
        disabled={!(isValid && dirty)}
        style={{ textTransform: 'none', fontSize: 12 }}
      >
        Save
      </Button>
    </MuiDialogActions>
  </Form>
);

SaveVisualizationModal.propTypes = {
  closeModal: PropTypes.func,
  saveVisualization: PropTypes.func,
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

export default SaveVisualizationModal;
