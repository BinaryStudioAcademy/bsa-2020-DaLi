import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { useStyles } from '../styles';

const DeactivateUserBody = ({ closeModal, user, deactivateUser }) => {
  const classes = useStyles();

  const handleDeactivateUser = () => {
    deactivateUser({ id: user.id, data: { isActive: user.isActive } });
    closeModal();
  };

  return (
    <div className={classes.modalContainer} id="deactivateUserModal">
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>{`Do you want to deactivate ${user.firstName} ${user.lastName}?`}</h2>
        <CloseIcon className={classes.closeIcon} onClick={closeModal} />
      </div>
      <div>Are you sure you want to do this?</div>
      <Button className={classes.resetButton} onClick={handleDeactivateUser} id="deactivateUser-deactivate">
        Deactivate user
      </Button>
    </div>
  );
};

DeactivateUserBody.propTypes = {
  deactivateUser: PropTypes.func,
  closeModal: PropTypes.func,
  user: PropTypes.object,
};

export default DeactivateUserBody;
