import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

export const switchStyles = makeStyles((theme) => ({
  root: {
    width: 70,
    margin: theme.spacing(1),
    overflow: 'unset',
  },
  switchBase: {
    padding: 1,
    border: 'none',
    '&$checked': {
      transform: 'translateX(44px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#1CD1A1',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#1CD1A1',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    border: '1px solid #CFD7DF',
    backgroundColor: '#F2F2F2',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));

const PrettySwitch = (props) => {
  const classes = switchStyles();
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      size="medium"
      // disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
};

const EditItem = ({ closeEditColumn, currentColumnId, columns, updateColumnConfig, validateField, errors }) => {
  const [open, setOpen] = useState(false);
  const currentColumn = columns.filter((column) => column.id === currentColumnId)[0];
  const [separatorType, setSeparatorType] = useState(currentColumn?.separatorType || '');
  const [decimalPlaces, setDecimalPlaces] = useState(currentColumn?.decimalPlaces || '');
  const [multiplyBy, setMultiplyBy] = useState(currentColumn?.multiplyBy || '');
  const [isMiniBarChart, setIsMiniBarChart] = useState(currentColumn?.isMiniBarChart || '');
  const [timeType, setTimeType] = useState(currentColumn?.timeType || '');
  const [displayTime, setDisplayTime] = useState(currentColumn?.displayTime || '');
  const [timeStyle, setTimeStyle] = useState(currentColumn?.timeStyle || '');

  const editColumn = (columnKey, columnValue) => {
    const newColumns = [...columns];
    const columnIndex = columns.findIndex((column) => column.id === currentColumnId);
    newColumns[columnIndex][columnKey] = columnValue;

    updateColumnConfig(newColumns);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeColumnTitle = (event) => {
    editColumn('title', event.target.value);
    validateField('title', event.target.value);
  };

  const handleChangeSeparatorType = (event) => {
    setSeparatorType(event.target.value);
    editColumn('separatorType', event.target.value);
  };

  const handleChangeDecimalPlaces = (event) => {
    setDecimalPlaces(event.target.value);
    editColumn('decimalPlaces', event.target.value);
  };

  const handleChangeMultiplyBy = (event) => {
    setMultiplyBy(event.target.value);
    editColumn('multiplyBy', event.target.value);
  };

  const handleChangeMiniBarChart = (event) => {
    setIsMiniBarChart(event.target.checked);
    editColumn('isMiniBarChart', event.target.checked);
  };

  const handleChangeTime = (event) => {
    setDisplayTime(event.target.value);
    editColumn('displayTime', event.target.value);
  };

  const handleChangeTimeStyle = (event) => {
    setTimeStyle(event.target.value);
    editColumn('timeStyle', event.target.value);
  };

  const handleChangeTimeType = (event) => {
    setTimeType(event.target.value);
    editColumn('timeType', event.target.value);
  };

  return (
    <>
      <div aria-hidden="true" onClick={closeEditColumn} className="edit-menu-back-button">
        <ArrowBackIosIcon />
        <span>{currentColumn.id}</span>
      </div>
      <div className="edit-menu-title">Column title</div>
      <TextField
        id="outlined-password-input"
        onChange={handleChangeColumnTitle}
        value={currentColumn.title}
        type="text"
        autoComplete="current-password"
        variant="outlined"
        fullWidth
        helperText={errors.title ? 'Column name should be at most 30 characters' : null}
        error={errors.title}
      />
      {currentColumn.type === 'number' && (
        <>
          <div className="edit-menu-title">Show mini bar chart</div>
          <PrettySwitch color="primary" value={isMiniBarChart} onChange={handleChangeMiniBarChart} />
          <div className="edit-menu-title">Separator style</div>
          <FormControl fullWidth>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={separatorType}
              onChange={handleChangeSeparatorType}
              displayEmpty
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value="">100000.00</MenuItem>
              <MenuItem value="ru">100 000,00</MenuItem>
              <MenuItem value="en">100,000.00</MenuItem>
              <MenuItem value="de">100.000,00</MenuItem>
            </Select>
          </FormControl>
          <div className="edit-menu-title">Minimum number of decimal places</div>
          <TextField
            type="number"
            value={decimalPlaces}
            onChange={handleChangeDecimalPlaces}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1,
              min: 0,
            }}
            variant="outlined"
            fullWidth
          />
          <div className="edit-menu-title">Multiply by a number</div>
          <TextField
            type="number"
            value={multiplyBy}
            onChange={handleChangeMultiplyBy}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
          />
        </>
      )}
      {currentColumn.type === 'date' && (
        <>
          <div className="edit-menu-title">Date style</div>
          <FormControl fullWidth>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={timeType}
              onChange={handleChangeTimeType}
              displayEmpty
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value="">August 31, 2020</MenuItem>
              <MenuItem value="DD MM YYYY">31 August, 2020</MenuItem>
              <MenuItem value="dd MM DD YYYY">Monday, August 31, 2020</MenuItem>
              <MenuItem value="MM/DD/YYYY">8/31/2020 (month, day, year)</MenuItem>
              <MenuItem value="DD/MM/YYYY">31/8/2020 (day, month, year)</MenuItem>
              <MenuItem value="YYYY/MM/DD">2020/8/31 (year, month, day)</MenuItem>
            </Select>
          </FormControl>
          <div className="edit-menu-title">Show the time</div>
          <FormControl component="fieldset">
            <RadioGroup value={displayTime} onChange={handleChangeTime}>
              <FormControlLabel value="" control={<Radio color="primary" />} label="Off" />
              <FormControlLabel value="HH:MM" control={<Radio color="primary" />} label="HH:MM" />
              <FormControlLabel value="HH:MM:SS" control={<Radio color="primary" />} label="HH:MM:SS" />
              <FormControlLabel value="HH:MM:SS:MS" control={<Radio color="primary" />} label="HH:MM:SS:MS" />
            </RadioGroup>
          </FormControl>
          <div className="edit-menu-title">Time style</div>
          <FormControl component="fieldset">
            <RadioGroup value={timeStyle} onChange={handleChangeTimeStyle}>
              <FormControlLabel value="" control={<Radio color="primary" />} label="5:24 PM (12-hour clock)" />
              <FormControlLabel value="24h" control={<Radio color="primary" />} label="17:24 (24-hour clock)" />
            </RadioGroup>
          </FormControl>
        </>
      )}
    </>
  );
};

EditItem.propTypes = {
  closeEditColumn: PropTypes.func,
  currentColumnId: PropTypes.string,
  columns: PropTypes.array,
  updateColumnConfig: PropTypes.func,
  validateField: PropTypes.func,
  errors: PropTypes.object,
};

export default EditItem;
