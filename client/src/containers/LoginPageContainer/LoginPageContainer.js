import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { LoginForm, Modal } from '../../components';

import { loginUser } from './actions';

const LoginPageContainer = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Sign in to DaLi</h1>

        <LoginForm setIsModalVisible={setIsModalVisible} login={(data) => dispatch(loginUser(data))} />

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

const mapDispatchToProps = { loginUser };

export default connect(null, mapDispatchToProps)(LoginPageContainer);
