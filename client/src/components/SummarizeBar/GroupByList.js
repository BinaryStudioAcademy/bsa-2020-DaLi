import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import EventIcon from '@material-ui/icons/Event';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Filter1Icon from '@material-ui/icons/Filter1';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';

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
      return <HelpOutlineIcon />;
  }
};

const periods = ['day', 'week', 'month', 'quarter', 'year'];

const GroupByList = ({ type, name, isActive, currentGroupBy, setCurrentGroupBy, deleteGroupBy }) => {
  const classes = useStyles();
  const isDate = type === 'date';
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [period, setPeriod] = useState(isDate ? currentGroupBy.period || 'month' : null);
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
    <Button
      className={isActive ? `${classes.groupByButtonContainer} active` : classes.groupByButtonContainer}
      aria-hidden="true"
      variant="contained"
      onClick={changeGroupBy}
    >
      <p style={{ display: 'flex', alignItems: 'center' }}>
        {iconForType(type)} {name}
      </p>

      {isDate && (
        <div role="button" aria-hidden="true" onClick={handleMenuClick}>
          <span className="date-period-btn">by {period}</span>
        </div>
      )}

      <Menu id="add-time-period" anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={onCloseMenu}>
        {periods.map((period) => (
          <MenuItem key={period} onClick={selectPeriod(period)}>
            {period}
          </MenuItem>
        ))}
      </Menu>
      <span style={{ height: 18 }}>{rightIcon}</span>
    </Button>
  );
};

GroupByList.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  setCurrentGroupBy: PropTypes.func,
  deleteGroupBy: PropTypes.func,
  currentGroupBy: PropTypes.object,
};

export default GroupByList;
