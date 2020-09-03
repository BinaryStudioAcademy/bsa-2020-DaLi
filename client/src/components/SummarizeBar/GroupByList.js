import React from 'react';
import PropTypes from 'prop-types';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import EventIcon from '@material-ui/icons/Event';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Filter1Icon from '@material-ui/icons/Filter1';

import useStyles from './styles';

const iconForType = (type) => {
  switch (type) {
    case 'number': {
      return <Filter1Icon />;
    }
    case 'string': {
      return <TextFieldsIcon />;
    }
    case 'date': {
      return <EventIcon />;
    }
    default:
      return null;
  }
};

const GroupByList = ({ type, name, isActive, setCurrentGroupBy, deleteGroupBy }) => {
  const classes = useStyles();
  const rightIcon = isActive ? <CloseIcon onClick={deleteGroupBy} /> : <AddIcon />;
  const changeGroupBy = () => {
    setCurrentGroupBy(name);
  };
  return (
    <div
      className={isActive ? `${classes.groupByButtonContainer} active` : classes.groupByButtonContainer}
      role="button"
      aria-hidden="true"
      onClick={changeGroupBy}
    >
      {iconForType(type)}
      <p>{name}</p>
      <span>{rightIcon}</span>
    </div>
  );
};

GroupByList.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  setCurrentGroupBy: PropTypes.func,
  deleteGroupBy: PropTypes.func,
};

export default GroupByList;
