import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  goBackBtn: {
    marginBottom: 20,
    backgroundColor: '#E2E3EF',
    color: '#7172AD',
  },
}));

function DateFilterForm({ filter, openFiltersList, setActiveFilter }) {
  const classes = useStyles();

  const [datePickerFormat, setDatePickerFormat] = useState('between');
  const [greaterThan, setGreaterThen] = useState(filter.greaterThan ? new Date(filter.greaterThan) : null);
  const [lessThan, setLessThan] = useState(filter.lessThan ? new Date(filter.lessThan) : null);

  const chooseDatePickerForm = (datePickerFormat) => {
    switch (datePickerFormat) {
      case 'between':
        return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker clearable value={greaterThan} onChange={setGreaterThen} helperText="FROM" />
            <DateTimePicker clearable value={lessThan} onChange={setLessThan} helperText="TO" />
          </MuiPickersUtilsProvider>
        );

      case 'after':
      case 'before':
      default:
        return null;
    }
  };

  useEffect(() => {
    setActiveFilter((filter) => ({ ...filter, lessThan, greaterThan }));
  }, [greaterThan, lessThan, setActiveFilter]);

  const handleSelectDatePickerFormat = (event) => {
    setDatePickerFormat(event.target.value);
  };

  return (
    <>
      <Button className={classes.goBackBtn} onClick={openFiltersList}>
        Back to filters list
      </Button>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select value={datePickerFormat} onChange={handleSelectDatePickerFormat}>
          <MenuItem value="between">between</MenuItem>
          <MenuItem disabled value="before">
            before
          </MenuItem>
          <MenuItem disabled value="after">
            after
          </MenuItem>
        </Select>
      </FormControl>
      {chooseDatePickerForm(datePickerFormat)}
    </>
  );
}

DateFilterForm.propTypes = {
  filter: PropTypes.object,
  openFiltersList: PropTypes.func,
  setActiveFilter: PropTypes.func,
};

export default DateFilterForm;
