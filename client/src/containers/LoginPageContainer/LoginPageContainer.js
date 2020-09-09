import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { LoginForm, Modal } from '../../components';

import { registerAdmin, login } from './actions';
import SignUpContainer from '../SingUp/SignUp';
import { authAPIService } from '../../services/api/AuthAPI.service';

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

  if (register) {
    return <SignUpContainer handleSubmitRegister={handleSubmitRegister} />;
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Sign in to DaLi</h1>
        <LoginForm setIsModalVisible={setIsModalVisible} login={handleSubmit} />
        {isModalVisible && (
          <Modal onModalClose={() => setIsModalVisible(false)}>
            <Modal.Body>Please contact an administrator to reset your password</Modal.Body>
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
