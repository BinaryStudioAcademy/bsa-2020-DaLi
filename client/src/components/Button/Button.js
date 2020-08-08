import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import './styles.css';

const Button = ({ text, onClick, disabled, icon, classes, active, ...attrs }) => {
  const btnClasses = classNames('btn', ...classes, { active });

  return (
    <MaterialButton onClick={onClick} className={btnClasses} disabled={disabled} {...attrs}>
      {icon}
      {text}
    </MaterialButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  active: PropTypes.bool,
  classes: PropTypes.array,
  attrs: PropTypes.array,
};

export default Button;

// Example how to use:

// import AlarmIcon from '@material-ui/icons/Alarm';

// <Button
//   text="Hello World"
//   classes={['danger', 'outline', 'rounded']}
//   icon={<AlarmIcon />}
//   disabled
//   onClick={() => alert('hello')}
// />;
