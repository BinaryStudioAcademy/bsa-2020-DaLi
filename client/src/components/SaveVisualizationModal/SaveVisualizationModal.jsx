import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { Formik, Form, Field } from 'formik';

import './styles.css';

const SaveVisualizationModal = () => {
  const cancel = () => {

  };
  const onSubmit = () => {

  }
  return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">
          Save visualization
          </Typography>
          <IconButton aria-label="close" size='small' style={{position:'absolute', top: 20, right: 24,}}>
            <CloseIcon style={{fontSize: 18, color: '#c6cfd4',}}/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={{name: '', description: ''}} onSubmit={() =>console.log('SUBMIT FORM')} >
            <Form className='visualizationModalForm'>
              <label>Name</label>
              <Field name='name' as='input' placeholder='What is the name of your card?'/>
              <label>Description</label>
              <Field name='description' as='textarea' placeholder='It`s optional but oh, so helpful'/>
            </Form>
          </Formik>
        </DialogContent>
        <MuiDialogActions className='visualizationModalFooter'>
          <Button variant="outlined" style={{textTransform: 'none', fontSize: 12}}>
            Cancel
          </Button>
          <Button variant="outlined" disabled style={{textTransform: 'none', fontSize: 12}}>
            Save
          </Button>
        </MuiDialogActions>
      </Dialog>
  )
};

export default SaveVisualizationModal;
