/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';
import { Button } from '@material-ui/core';

const modalContext = React.createContext();

const modalRef = React.createRef();
const handleTabKey = (e) => {
  const focusableModalElements = modalRef.current.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstElement = focusableModalElements[0];
  const lastElement = focusableModalElements[focusableModalElements.length - 1];

  if (!e.shiftKey && document.activeElement !== firstElement) {
    firstElement.focus();
    return e.preventDefault();
  }

  if (e.shiftKey && document.activeElement !== lastElement) {
    lastElement.focus();
    e.preventDefault();
  }

  return '';
};

function Modal({ children, onModalClose }) {
  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ]);
  React.useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  });

  return ReactDOM.createPortal(
    <div className="modal-container" role="dialog" aria-modal="true">
      <div className="modal-content" ref={modalRef}>
        <modalContext.Provider value={{ onModalClose }}>{children}</modalContext.Provider>
      </div>
    </div>,
    document.body
  );
}

Modal.Header = function ModalHeader(props) {
  const { onModalClose } = React.useContext(modalContext);
  const { children } = props;

  return (
    <div className="modal-header">
      {children}
      <button type="button" className="cross-btn" title="close modal" onClick={onModalClose}>
        ✕
      </button>
    </div>
  );
};

Modal.Body = function ModalBody(props) {
  const { children } = props;
  return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter(props) {
  const { children } = props;
  return <div className="modal-footer">{children}</div>;
};

Modal.Footer.CloseBtn = function CloseBtn(props) {
  const { onModalClose } = React.useContext(modalContext);
  return (
    <Button
      {...props}
      className="close-btn"
      title="close modal"
      variant="contained"
      size="large"
      color="primary"
      onClick={onModalClose}
    />
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

Modal.Header.propTypes = {
  children: PropTypes.node,
};

Modal.Body.propTypes = {
  children: PropTypes.node,
};

Modal.Footer.propTypes = {
  children: PropTypes.node,
};

export default Modal;
