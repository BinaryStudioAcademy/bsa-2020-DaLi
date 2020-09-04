import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';
import { LoginForm, Modal } from '../../components';
import { login } from './actions';
import hero from '../../images/DaLi-Sign-Up-Page.png';

import './styles.css';

const LoginPageContainer = ({ error }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data) => {
    dispatch(login(data));
    setOpen(true);
  };

  return (
    <div className="login-container">
      <div className="login-hero-container">
        <img alt="hero-dali" src={hero} className="hero-dali" />
      </div>
      <div className="form-wrapper">
        <Typography variant="h1" className="title" color="primary">
          Sign in to DaLi
        </Typography>
        <LoginForm setIsModalVisible={setIsModalVisible} login={handleSubmit} />
        {isModalVisible && (
          <Modal onModalClose={() => setIsModalVisible(false)}>
            <Modal.Body>
              <Typography variant="h3" color="textPrimary">
                Please contact an administrator to reset your password
              </Typography>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Footer.CloseBtn>Back to login</Modal.Footer.CloseBtn>
            </Modal.Footer>
          </Modal>
        )}
        {error && (
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} variant="filled" severity="error" children={error} />
          </Snackbar>
        )}
      </div>
    </div>
  );
};

LoginPageContainer.propTypes = {
  error: PropTypes.string,
};

const mapStateToProps = ({ currentUser }) => ({
  error: currentUser.error,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
