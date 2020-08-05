import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import * as Yup from "yup";
import {Formik, Form} from 'formik';

import {MyField} from "../FormControls/FormControls";
import './styles.css';

const ValidationSchema = Yup.object({
  name: Yup.string()
      .required("Name is required")
})


const SaveVisualizationModal = ({saveVisualization, closeModal, isVisible}) => {

  const cancel = (resetForm) => () => {
    resetForm();
    /*    closeModal();*/
  };
  const save = (values) => {
    console.log(values);
    /*    saveVisualization();*/
  }
  return (
      <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
        <DialogTitle>
          Save visualization
          <IconButton aria-label="close" size='small' style={{position: 'absolute', top: 20, right: 24,}}>
            <CloseIcon style={{fontSize: 18, color: '#c6cfd4',}}/>
          </IconButton>
        </DialogTitle>

        <Formik initialValues={{name: '', description: ''}} validationSchema={ValidationSchema}
                onSubmit={values => save(values)}>
          {(props) => (
              <Form className='visualizationModalForm' onSubmit={props.handleSubmit}>
                <DialogContent>
                  <MyField name='name' as='input' placeholder='What is the name of your card?' label='Name'/>
                  <MyField name='description' as='textarea' placeholder='It`s optional but oh, so helpful'
                           label='Description'/>

                </DialogContent>
                <MuiDialogActions className='visualizationModalFooter'>
                  <Button onClick={cancel(props.resetForm)} variant="outlined"
                          style={{textTransform: 'none', fontSize: 12}}>
                    Cancel
                  </Button>
                  <Button type='submit' variant="outlined" disabled={!(props.isValid && props.dirty)}
                          style={{textTransform: 'none', fontSize: 12}}>
                    Save
                  </Button>
                </MuiDialogActions>
              </Form>
          )}

        </Formik>
      </Dialog>
  )
};

export default SaveVisualizationModal;
