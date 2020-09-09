import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  goBackBtn: {
    marginBottom: 20,
    backgroundColor: '#E2E3EF',
    color: '#7172AD',
  },
  textField: {
    margin: '20px 0',
  },
}));

function NumberFilterForm({ openFiltersList }) {
  const classes = useStyles();
  //   string filter model : {
  //     type: 'string',
  //     name: 'name',
  //     greaterThan: number from input,
  //     lessThan: number from input,
  //   }

  const [numberFormatPicker, setNumberFormatPicker] = useState('between');

  return (
    <>
      <Button className={classes.goBackBtn} onClick={openFiltersList}>
        Back to filters list
      </Button>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select value={numberFormatPicker} onChange={(e) => setNumberFormatPicker(e.target.value)}>
          <MenuItem value="between">between</MenuItem>
          <MenuItem value="greaterThan">greater equal than</MenuItem>
          <MenuItem value="lessThan">less equal than</MenuItem>
        </Select>
      </FormControl>
      {/* <TextField
        value={substring}
        onInput={(e) => {
          const value = e.target.value;
          setSubstring(value.slice(0, 20));
        }}
        placeholder="search for substring"
        type="string"
        className={classes.textField}
      /> */}
      {/* <FormControlLabel
        control={(() => (
          <Checkbox checked={isCaseSensitive} onChange={(e) => setIsCaseSensitive(e.target.checked)} color="primary" />
        ))()}
        label="case sensitive"
      /> */}
    </>
  );
}

NumberFilterForm.propTypes = {
  filter: PropTypes.object,
  openFiltersList: PropTypes.func,
  setActiveFilter: PropTypes.func,
};

export default NumberFilterForm;
