import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { LoginForm, Modal } from '../../components';

import { login } from './actions';

const LoginPageContainer = ({ token }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Sign in to DaLi</h1>
        <LoginForm setIsModalVisible={setIsModalVisible} token={token} login={(data) => dispatch(login(data))} />
        {isModalVisible && (
          <Modal onModalClose={() => setIsModalVisible(false)}>
            <Modal.Body>Please contact an administrator to reset your password</Modal.Body>
            <Modal.Footer>
              <Modal.Footer.CloseBtn>Back to login</Modal.Footer.CloseBtn>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

LoginPageContainer.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = ({ currentUser }) => ({
  token: currentUser.token,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
