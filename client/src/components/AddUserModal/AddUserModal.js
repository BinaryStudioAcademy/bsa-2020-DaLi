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
import PasswordModal from '../PasswordModal/PasswordModal';

const ValidationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(10, 'First name must be at most 30 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(10, 'Last name must be at most 30 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
});

const AddUserModal = ({ closeModal, submitHandler, isVisible, user }) => {
  const [passwordModalVisible, setPasswordModalVisible] = React.useState(false);

  const cancel = (resetForm) => () => {
    resetForm();
    closeModal();
  };

  const handleSubmit = (values) => {
    closeModal();
    if (user) {
      submitHandler({ id: user.id, data: values });
    } else {
      submitHandler(values);
    }
  };

  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };
  const closePasswordModal = () => {
    setPasswordModalVisible(false);
  };

  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        {user ? 'Edit user' : 'New user'}
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
        initialValues={
          user
            ? { firstName: user.firstName, lastName: user.lastName, email: user.email }
            : { firstName: '', lastName: '', email: '' }
        }
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => <MyForm openPasswordModal={openPasswordModal} editMode={!!user} cancel={cancel} {...props} />}
      </Formik>
      <PasswordModal open={passwordModalVisible} closePasswordModal={closePasswordModal} />
    </Dialog>
  );
};

const MyForm = ({ resetForm, isValid, dirty, cancel, errors, touched, editMode }) => {
  return (
    <Form className="addUserModalForm">
      <DialogContent className="MyFieldContainer">
        <div className="labelsContainer">
          <span>First name</span>
          <p>{touched.firstName && errors.firstName}</p>
        </div>
        <Field
          name="firstName"
          as="input"
          placeholder="Johnny"
          id="addUser-firstName"
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
          id="addUser-lastName"
          style={touched.name && errors.name ? { borderColor: 'red' } : {}}
        />
        <div className="labelsContainer">
          <span>Email</span>
          <p>{touched.email && errors.email}</p>
        </div>
        <Field
          name="email"
          as="input"
          id="addUser-email"
          placeholder="youlooknicetoday@email.com"
          style={touched.name && errors.name ? { borderColor: 'red' } : {}}
        />
      </DialogContent>
      <MuiDialogActions className="addUserModalFooter">
        <Button
          onClick={cancel(resetForm)}
          variant="outlined"
          style={{ textTransform: 'none', fontSize: 12 }}
          id="addUser-cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outlined"
          disabled={isValid && !dirty}
          style={{ textTransform: 'none', fontSize: 12 }}
          id="addUser-create"
        >
          {editMode ? 'Update' : 'Create'}
        </Button>
      </MuiDialogActions>
    </Form>
  );
};

AddUserModal.propTypes = {
  closeModal: PropTypes.func,
  addUser: PropTypes.func,
  isVisible: PropTypes.bool,
  submitHandler: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
};

MyForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
  editMode: PropTypes.bool,
};

export default AddUserModal;
