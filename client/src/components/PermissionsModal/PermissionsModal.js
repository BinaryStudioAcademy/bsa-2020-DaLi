import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PermissionsModal = (props) => {
  const { isVisible, onClose, onSaveChanges } = props;

  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Change Permissions</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Are you sure you want to save changes?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSaveChanges} color="primary">
          Save
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PermissionsModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onSaveChanges: PropTypes.func,
};

export default PermissionsModal;
