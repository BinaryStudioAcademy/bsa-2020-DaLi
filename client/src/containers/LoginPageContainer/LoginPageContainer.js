import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';
import { LoginForm, Modal } from '../../components';
import hero from '../../images/DaLi-Sign-Up-Page.png';
import { registerAdmin, login } from './actions';
import SignUpContainer from '../SingUp/SignUp';
import { authAPIService } from '../../services/api/AuthAPI.service';

import './styles.css';

const LoginPageContainer = ({ error }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [register, setRegister] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data) => {
    dispatch(login(data));
    setOpen(true);
  };

  const handleSubmitRegister = (data) => {
    dispatch(registerAdmin(data));
  };

  useEffect(() => {
    authAPIService.isFirstLogIn().then((res) => {
      if (res) {
        setRegister(true);
      }
    });
  }, []);

  return (
    <div className="login-container">
      <div className="login-hero-container">
        <img alt="hero-dali" src={hero} className="hero-dali" />
      </div>
      <div className="form-wrapper">
        <Typography variant="h1" className="title" color="primary">
          {register ? 'Sign up to DaLi' : 'Sign in to DaLi'}
        </Typography>
        {register ? (
          <SignUpContainer handleSubmitRegister={handleSubmitRegister} />
        ) : (
          <LoginForm setIsModalVisible={setIsModalVisible} login={handleSubmit} />
        )}
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

const mapDispatchToProps = { login, registerAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
