/* eslint-disable */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2e353b',
    fontSize: 14,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    display: 'inline-box',
    fontSize: 20,
    fontWeight: 500,
  },
  closeIcon: {
    opacity: 0.4,
    fontSize: 18,
    '&:hover': {
      opacity: 0.8,
    },
  },
  modalContainer: {
    position: 'absolute',
    maxWidth: 640,
    width: '100%',
    backgroundColor: '#ffffff',
    outline: 'none',
    borderRadius: 4,
    padding: 32,
    margin: '0 auto',
  },
  passwordContainer: {
    border: '1px solid #f0f0f0',
    position: 'relative',
    marginTop: 20,
    padding: '24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > span': {
      paddingLeft: 24,
      fontSize: 24,
      letterSpacing: 4,
      outline: 'none',
    },
  },
  passwordContainerTitle: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    top: -10,
    '& span': {
      fontSize: 12,
      backgroundColor: '#ffffff',
      color: '#74838f',
    },
  },
  passwordIcons: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 24,

    '& span': {
      marginRight: 10,
      color: '#509ee3',
      border: '1px solid #ffffff',
      cursor: 'pointer',
      '&:hover': {
        borderBottom: '1px solid #509ee3',
      },
    },
  },
  passwordIcon: {
    width: 20,
    '&:hover': {
      color: '#509ee3',
    },
  },

  doneButton: {
    color: 'white',
    textTransform: 'none',
    background: '#3ca1de',
    marginTop: 20,
    float: 'right',
    borderRadius: '5px',
    padding: 10,
    '&:hover': {
      background: '#3ca1de',
    },
  },
  resetButton: {
    color: 'white',
    textTransform: 'none',
    background: '#ed6e6e',
    marginTop: 20,
    float: 'right',
    borderRadius: '5px',
    padding: 10,
    '&:hover': {
      background: '#ed6e6e',
    },
  },
}));

export default function PasswordModal({ open = false, closePasswordModal }) {
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(false);
  const [isReset, setIsReset] = React.useState(true);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    // setOpen(false);
    setIsReset(true);
  };

  const handleReset = () => {
    setIsReset(false);
  };

  const resetModalBody = (
    <div className={classes.modalContainer}>
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>Reset NAME password?</h2>
        <CloseIcon className={classes.closeIcon} onClick={closePasswordModal} />
      </div>
      <div>Are you sure you want to do this?</div>
      <Button className={classes.resetButton} onClick={handleReset}>
        Reset password
      </Button>
    </div>
  );
  const passwordModalBody = (
    <div className={classes.modalContainer}>
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>NAME password has been reset</h2>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
      </div>
      <div>Here’s a temporary password they can use to log in and then change their password.</div>
      <div className={classes.passwordContainer}>
        <div className={classes.passwordContainerTitle}>
          <span>TEMPORARY PASSWORD</span>
        </div>
        <span>●●●●●●●●●●●●</span>
        <div className={classes.passwordIcons}>
          <span>Show</span>
          <EventNoteIcon className={classes.passwordIcon} />
        </div>
      </div>
      <Button className={classes.doneButton} onClick={handleClose}>
        Done
      </Button>
    </div>
  );

  return (
    <Modal className={classes.modal} open={open} onClose={handleClose} disableBackdropClick={isReset ? true : true}>
      {isReset ? resetModalBody : passwordModalBody}
    </Modal>
  );
}
