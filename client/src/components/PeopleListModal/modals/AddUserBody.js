import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useStyles } from '../styles';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(30, 'First name must be at most 30 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(30, 'Last name must be at most 30 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
});

const AddUserBody = ({ closeModal, user, addUser, updateUser, setFormData, formData }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: user
      ? {
          firstName: formData.firstName || user.firstName,
          lastName: formData.lastName || user.lastName,
          email: formData.email || user.email,
        }
      : formData,

    validationSchema,

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      setFormData(values);
      if (user?.id) {
        updateUser({ id: user.id, data: values });
      } else {
        addUser(values);
      }
    },
  });
  return (
    <div className={classes.modalContainer}>
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>{user?.id ? 'Edit user' : 'Create user'}</h2>
        <CloseIcon className={classes.closeIcon} onClick={closeModal} />
      </div>
      <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} className="addUserModalForm">
        <div className="labelsContainer">
          <span>First name</span>
          <div className="errorMessage">{formik.touched.firstName && formik.errors.firstName}</div>
        </div>
        <input
          id="firstName"
          name="firstName"
          type="text"
          className={classes.modalInput}
          onChange={formik.handleChange}
          value={formik.values.firstName}
          style={formik.touched.firstName && formik.errors.firstName ? { borderColor: 'red' } : {}}
        />
        <div className="labelsContainer">
          <span>Last name</span>
          <div className="errorMessage">{formik.touched.lastName && formik.errors.lastName}</div>
        </div>
        <input
          id="lastName"
          name="lastName"
          type="text"
          className={classes.modalInput}
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <div className="labelsContainer">
          <span>Email</span>
          <div className="errorMessage">{formik.touched.email && formik.errors.email}</div>
        </div>
        <input
          id="email"
          name="email"
          type="text"
          className={classes.modalInput}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <div className={classes.buttonContainer}>
          <Button onClick={closeModal} variant="outlined" style={{ textTransform: 'none', fontSize: 12 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outlined"
            disabled={formik.isValid && !formik.dirty}
            style={{ textTransform: 'none', fontSize: 12, marginLeft: 5 }}
          >
            {user?.id ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

AddUserBody.propTypes = {
  addUser: PropTypes.func,
  updateUser: PropTypes.func,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  closeModal: PropTypes.func,
  user: PropTypes.object,
};

export default AddUserBody;
