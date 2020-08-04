import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Formik, Form, Field } from 'formik';

import './styles.css';

const SaveVisualizationModal = () => {
  return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>
          Save visualization
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
      </Dialog>
  )
};

export default SaveVisualizationModal;
