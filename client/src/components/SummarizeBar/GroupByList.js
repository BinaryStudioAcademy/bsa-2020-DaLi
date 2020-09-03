import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import EventIcon from '@material-ui/icons/Event';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Filter1Icon from '@material-ui/icons/Filter1';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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

const periods = ['day', 'week', 'month', 'year'];

const GroupByList = ({ type, name, isActive, setCurrentGroupBy, deleteGroupBy }) => {
  const classes = useStyles();
  const isDate = type === 'date';
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [period, setPeriod] = useState(isDate ? 'month' : null);
  const handleMenuClick = (event) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };

  const selectPeriod = (period) => (e) => {
    e.stopPropagation();
    setPeriod(period);
    setMenuAnchorEl(null);
    setCurrentGroupBy({ name, type, period });
  };

  const onCloseMenu = (e) => {
    e.stopPropagation();
    setMenuAnchorEl(null);
  };

  const rightIcon = isActive ? <CloseIcon onClick={deleteGroupBy} /> : <AddIcon />;
  const changeGroupBy = () => {
    setCurrentGroupBy({ name, type, period });
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

      {isDate && (
        <div role="button" aria-hidden="true" onClick={handleMenuClick}>
          <span>by {period}</span>
        </div>
      )}

      <Menu id="add-time-period" anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={onCloseMenu}>
        {periods.map((period) => (
          <MenuItem key={period} onClick={selectPeriod(period)}>
            {period}
          </MenuItem>
        ))}
      </Menu>
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
