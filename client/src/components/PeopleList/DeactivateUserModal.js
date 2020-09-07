import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Typography, DialogContent } from '@material-ui/core';

const DeactivateUserModal = ({ isVisible, closeModal, user, confirmHandler }) => {
  const onClickHandler = () => {
    closeModal();
    confirmHandler({ id: user.id, data: { isActive: user.isActive } });
  };

  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h3">{user ? `Deactivate ${user.firstName} ${user.lastName}?` : ''}</Typography>
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: 'absolute', top: 20, right: 24 }}
          onClick={closeModal}
        >
          <CloseIcon style={{ fontSize: 18, color: '#c6cfd4' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          {user ? `${user.firstName} ${user.lastName} won't be able to log in anymore.` : ''}
        </Typography>
      </DialogContent>
      <MuiDialogActions>
        <Button
          variant="outlined"
          style={{ backgroundColor: '#ed6e6e', borderColor: '#ed6e6e', color: '#ffffff' }}
          onClick={onClickHandler}
        >
          Deactivate
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};

DeactivateUserModal.propTypes = {
  closeModal: PropTypes.func,
  addUser: PropTypes.func,
  confirmHandler: PropTypes.func,
  isVisible: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    isActive: PropTypes.bool,
  }),
};

export default DeactivateUserModal;
