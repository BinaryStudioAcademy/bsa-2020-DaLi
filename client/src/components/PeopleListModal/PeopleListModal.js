import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  updateUser,
  setFormData,
  closeModal,
  addUser,
  toggleUserStatus,
  openModal,
  resetPassword,
} from '../../containers/PeoplePageContainer/actions';
import { useStyles } from './styles';
import AddUserBody from './modals/AddUserBody';
import DeactivateUserBody from './modals/DeactivateUserBody';
import ResetPasswordBody from './modals/ResetPasswordBody';
import TemporaryPasswordBody from './modals/TemporaryPasswordBody';

const PeopleListModal = ({
  openModal,
  isOpen,
  modal,
  updateUser,
  formData,
  setFormData,
  closeModal,
  addUser,
  toggleUserStatus,
  password,
  resetPassword,
  currentUserId,
}) => {
  const classes = useStyles();

  if (modal.type === 'Add user' || modal.type === 'Edit user') {
    return (
      <Dialog className={classes.modal} open={isOpen || false} onClose={closeModal}>
        <>
          <AddUserBody
            addUser={addUser}
            closeModal={closeModal}
            updateUser={updateUser}
            openModal={openModal}
            formData={formData}
            user={modal.user}
            setFormData={setFormData}
            currentUserId={currentUserId}
          />
        </>
      </Dialog>
    );
  }

  if (modal.type === 'Deactivate user') {
    return (
      <Dialog className={classes.modal} open={isOpen || false} onClose={closeModal}>
        <>
          <DeactivateUserBody closeModal={closeModal} deactivateUser={toggleUserStatus} user={modal.user} />
        </>
      </Dialog>
    );
  }

  if (modal.type === 'Reset password') {
    return (
      <Dialog className={classes.modal} open={isOpen || false} onClose={closeModal}>
        <>
          <ResetPasswordBody
            closeModal={closeModal}
            user={modal.user}
            openModal={openModal}
            resetPassword={resetPassword}
          />
        </>
      </Dialog>
    );
  }

  if (modal.type === 'Password') {
    return (
      <Dialog className={classes.modal} open={isOpen || false} onClose={closeModal}>
        <>
          <TemporaryPasswordBody closeModal={closeModal} user={modal.user} openModal={openModal} password={password} />
        </>
      </Dialog>
    );
  }

  return null;
};

PeopleListModal.propTypes = {
  currentUserId: PropTypes.string,
  openModal: PropTypes.func,
  isOpen: PropTypes.bool,
  modal: PropTypes.object,
  updateUser: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  closeModal: PropTypes.func,
  addUser: PropTypes.func,
  toggleUserStatus: PropTypes.func,
  password: PropTypes.string,
  resetPassword: PropTypes.func,
};

const mapStateToProps = ({ currentUser, admin: { people } }) => {
  return {
    currentUserId: currentUser.user.id,
    isOpen: people.modal.open,
    modal: people.modal,
    formData: people.formData,
    password: people.temporaryPassword,
  };
};

const mapDispatchToProps = {
  updateUser,
  setFormData,
  closeModal,
  addUser,
  toggleUserStatus,
  openModal,
  resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleListModal);
