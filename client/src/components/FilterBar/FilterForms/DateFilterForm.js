import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import { DateTimePicker } from '@material-ui/pickers';

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

const chooseDatePickerForm = (datePickerFormat) => {
  switch (datePickerFormat) {
    case 'between':
      return (
        <div>xdxdxd</div>
        // <DateTimePicker clearable value={clearedDate} onChange={handleClearedDateChange} helperText="FROM" />
      );

    case 'after':
      return <div>axaxxa</div>;
    case 'before':
    default:
      return null;
  }
};

function DateFilterForm({ openFiltersList }) {
  // console.log(filter);
  const classes = useStyles();
  const [datePickerFormat, setDatePickerFormat] = useState('between');

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
          <MenuItem value="before">before</MenuItem>
          <MenuItem value="after">after</MenuItem>
        </Select>
      </FormControl>
      {chooseDatePickerForm(datePickerFormat)}
    </>
  );
}

DateFilterForm.propTypes = {
  // filter: PropTypes.object,
  openFiltersList: PropTypes.func,
};

export default DateFilterForm;
