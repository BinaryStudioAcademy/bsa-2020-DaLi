import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { LoginForm, Modal } from '../../components';
import { login } from './actions';

const LoginPageContainer = ({ token, error }) => {
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
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Sign in to DaLi</h1>
        <LoginForm setIsModalVisible={setIsModalVisible} token={token} login={handleSubmit} />
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
  token: PropTypes.string,
  error: PropTypes.string,
};

const mapStateToProps = ({ currentUser }) => ({
  token: currentUser.token,
  error: currentUser.error,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
