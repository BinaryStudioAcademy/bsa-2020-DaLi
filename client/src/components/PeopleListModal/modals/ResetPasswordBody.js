import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { useStyles } from '../styles';

const ResetPasswordBody = ({ openModal, closeModal, user, resetPassword }) => {
  const classes = useStyles();

  const handleReset = () => {
    resetPassword(user.id);
    openModal({ user, type: 'Password' });
  };
  return (
    <div className={classes.modalContainer} style={{ width: 550, height: 120 }} id="resetPasswordModal">
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>{`Reset ${user.firstName} ${user.lastName}'s password?`}</h2>
        <CloseIcon className={classes.closeIcon} onClick={closeModal} />
      </div>
      <div>Are you sure you want to do this?</div>
      <Button
        // className={classes.resetButton}
        color="primary"
        variant="contained"
        style={{ width: 'fit-content', alignSelf: 'flex-end' }}
        onClick={handleReset}
        id="resetPassword-reset"
      >
        Reset password
      </Button>
    </div>
  );
};

ResetPasswordBody.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  user: PropTypes.object,
  resetPassword: PropTypes.func,
};

export default ResetPasswordBody;
