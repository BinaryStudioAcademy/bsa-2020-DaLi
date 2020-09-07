import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Button, Dialog, DialogTitle, Typography, IconButton, DialogContent } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { useStyles } from './styles';

const PasswordModal = ({ password, clearPassword, isReset, hideModal, resetPassword, user }) => {
  const inputRef = useRef(null);
  const classes = useStyles();
  const [open, setOpen] = useState(Boolean(password));

  const handleClose = () => {
    setOpen(false);
    clearPassword();
    hideModal();
  };

  const handleReset = () => {
    hideModal();
    setOpen(true);
    resetPassword(user.id);
  };

  const handleShowPassword = () => {
    inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
  };

  const copyPassword = () => {
    const listener = (e) => {
      e.clipboardData.setData('text/plain', password);
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  };

  const resetModalBody = user && (
    <>
      <DialogTitle>
        <Typography variant="h3">{`Reset ${user.firstName} ${user.lastName}'s password?`}</Typography>
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: 'absolute', top: 20, right: 24 }}
          onClick={handleClose}
        >
          <CloseIcon style={{ fontSize: 18, color: '#c6cfd4' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          Are you sure you want to do this?
        </Typography>
      </DialogContent>
      <MuiDialogActions>
        <Button variant="contained" color="primary" size="large" onClick={handleReset}>
          Reset password
        </Button>
      </MuiDialogActions>
    </>
  );

  const passwordModalBody = (
    <>
      <DialogTitle>
        <Typography variant="h3">New password</Typography>
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: 'absolute', top: 20, right: 24 }}
          onClick={handleClose}
        >
          <CloseIcon style={{ fontSize: 18, color: '#c6cfd4' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Typography variant="body2">
          Here’s a temporary password they can use to log in and then change their password.
        </Typography>
        <div className={classes.passwordContainer}>
          <div className={classes.passwordContainerTitle}>
            <span>TEMPORARY PASSWORD</span>
          </div>
          <input ref={inputRef} type="password" value={password} readOnly />
          <div className={classes.passwordIcons}>
            <button type="button" className={classes.passwordIconBtn} onClick={handleShowPassword}>
              Show
            </button>
            <FileCopyIcon className={classes.passwordIcon} style={{ color: '#1cd1a1' }} onClick={copyPassword} />
          </div>
        </div>
      </DialogContent>
      <Button variant="contained" color="primary" onClick={handleClose} style={{ margin: '10px 0 0 auto' }}>
        Done
      </Button>
    </>
  );

  return (
    <Dialog open={open || !!isReset} maxWidth="sm" fullWidth onClose={handleClose} disableBackdropClick={!isReset}>
      {isReset ? resetModalBody : passwordModalBody}
    </Dialog>
  );
};

PasswordModal.propTypes = {
  password: PropTypes.string,
  clearPassword: PropTypes.func,
  isReset: PropTypes.bool,
  hideModal: PropTypes.func,
  resetPassword: PropTypes.func,
  user: PropTypes.object,
};

export default PasswordModal;
