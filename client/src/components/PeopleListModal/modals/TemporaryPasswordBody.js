import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { useStyles } from '../styles';

const TemporaryPasswordBody = ({ closeModal, user, password }) => {
  const classes = useStyles();
  const inputRef = useRef(null);

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

  return (
    <div className={classes.modalContainer} id="newPasswordModal">
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>{`New password for ${user.firstName} ${user.lastName}`}</h2>
        <CloseIcon className={classes.closeIcon} onClick={closeModal} />
      </div>
      <div>Here’s a temporary password they can use to log in and then change their password.</div>
      <div className={classes.passwordContainer}>
        <div className={classes.passwordContainerTitle}>
          <span>TEMPORARY PASSWORD</span>
        </div>
        <input ref={inputRef} type="password" value={password} readOnly id="newPassword-pass" />
        <div className={classes.passwordIcons}>
          <button type="button" onClick={handleShowPassword} id="newPassword-showToggle">
            Show
          </button>
          <EventNoteIcon className={classes.passwordIcon} onClick={copyPassword} id="newPassword-copy" />
        </div>
      </div>
      <Button className={classes.doneButton} onClick={closeModal} id="newPassword-done">
        Done
      </Button>
    </div>
  );
};

TemporaryPasswordBody.propTypes = {
  closeModal: PropTypes.func,
  user: PropTypes.object,
  password: PropTypes.string,
};

export default TemporaryPasswordBody;
