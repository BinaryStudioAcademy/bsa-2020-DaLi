import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useStyles } from '../styles';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters'),
  description: Yup.string().max(100, 'Description must be at most 100 characters').nullable(),
});

const AddUserBody = ({ closeModal, editableCollection, setFormData, formData, addCollection, updateCollection }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { ...formData, ...editableCollection },

    validationSchema,

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      setFormData(values);
      if (editableCollection?.id) {
        updateCollection({ id: editableCollection.id, data: values });
      } else {
        addCollection(values);
      }
    },
  });
  return (
    <div className={classes.modalContainer} id={`${editableCollection?.id ? 'edit' : 'create'}CollectionModal`}>
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>{editableCollection?.id ? 'Edit collection' : 'Create collection'}</h2>
        <CloseIcon className={classes.closeIcon} onClick={closeModal} />
      </div>
      <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} className={classes.addCollectionModalForm}>
        <div className="labelsContainer">
          <span>Name</span>
          <div className="errorMessage">{formik.touched.name && formik.errors.name}</div>
        </div>
        <input
          id={`${editableCollection?.id ? 'edit' : 'create'}Collection-name`}
          name="name"
          type="text"
          placeholder="My new fantastic collections"
          className={classes.modalInput}
          onChange={formik.handleChange}
          value={formik.values.name}
          style={formik.touched.firstName && formik.errors.firstName ? { borderColor: 'red' } : {}}
        />
        <div className="labelsContainer">
          <span>Description</span>
          <div className="errorMessage">{formik.touched.description && formik.errors.description}</div>
        </div>
        <textarea
          id={`${editableCollection?.id ? 'edit' : 'create'}Collection-descriptions`}
          name="description"
          type="text"
          placeholder="It's optional but oh, so helpful"
          className={classes.modalInput}
          style={{ height: 200, resize: 'none' }}
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <div className={classes.buttonContainer}>
          <Button
            onClick={closeModal}
            variant="outlined"
            style={{ textTransform: 'none', fontSize: 12 }}
            id={`${editableCollection?.id ? 'edit' : 'create'}Collection-cancel`}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outlined"
            disabled={formik.isValid && !formik.dirty}
            style={{ textTransform: 'none', fontSize: 12, marginLeft: 5 }}
            id={`${editableCollection?.id ? 'edit' : 'create'}Collection-${
              editableCollection?.id ? 'update' : 'create'
            }`}
          >
            {editableCollection?.id ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

AddUserBody.propTypes = {
  closeModal: PropTypes.func,
  editableCollection: PropTypes.object,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  addCollection: PropTypes.func,
  updateCollection: PropTypes.func,
};

export default AddUserBody;
