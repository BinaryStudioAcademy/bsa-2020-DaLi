/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const modalContext = React.createContext();

function Modal({ children, onModalClose }) {
  React.useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = React.createRef();
  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([[27, onModalClose], [9, handleTabKey]]);

  return ReactDOM.createPortal(
    <div className="modal-container" role="dialog" aria-modal="true">
      <div className="modal-content" ref={modalRef}>
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </div>
    </div>,
    document.body
  );
}

Modal.Header = function ModalHeader(props) {
  const { onModalClose } = React.useContext(modalContext);

  return (
    <div className="modal-header">
      {props.children}
      <button className="cross-btn" title="close modal" onClick={onModalClose}>
        ✕
      </button>
    </div>
  );
};

Modal.Body = function ModalBody(props) {
  return <div className="modal-body">{props.children}</div>;
};

Modal.Footer = function ModalFooter(props) {
  return <div className="modal-footer">{props.children}</div>;
};

Modal.Footer.CloseBtn = function CloseBtn(props) {
  const { onModalClose } = React.useContext(modalContext);
  return (
    <button
      {...props}
      className="close-btn"
      title="close modal"
      onClick={onModalClose}
    />
  );
};

export default Modal;
