import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  goBackBtn: {
    width: '100%',
    marginBottom: 20,
  },
  textField: {
    margin: '20px 0',
  },
}));

function StringFilterForm({ filter, openFiltersList, setActiveFilter }) {
  const classes = useStyles();
  //   string filter model : {
  //     type: 'string',
  //     name: 'name',
  //     substring: substr from input,
  //     caseSensitive: res from checkbox
  //     checkType: 'equal' || 'notEqual' || 'includes' || 'notIncludes',
  //   }

  const [stringFormatPicker, setStringFormatPicker] = useState(filter.checkType || 'includes');
  const [substring, setSubstring] = useState(filter.substring || '');
  const [isCaseSensitive, setIsCaseSensitive] = useState(filter.caseSensitive || false);

  useEffect(() => {
    setActiveFilter((filter) => ({
      ...filter,
      substring,
      caseSensitive: isCaseSensitive,
      checkType: stringFormatPicker,
    }));
  }, [substring, stringFormatPicker, isCaseSensitive, setActiveFilter]);

  return (
    <>
      <Button variant="outlined" color="primary" className={classes.goBackBtn} onClick={openFiltersList}>
        Back to filters list
      </Button>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select value={stringFormatPicker} onChange={(e) => setStringFormatPicker(e.target.value)}>
          <MenuItem value="equal">equal to</MenuItem>
          <MenuItem value="notEqual">not equal to</MenuItem>
          <MenuItem value="includes">includes</MenuItem>
          <MenuItem value="notIncludes">not includes</MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={substring}
        onInput={(e) => {
          const value = e.target.value;
          setSubstring(value.slice(0, 20));
        }}
        placeholder="search for substring"
        type="string"
        className={classes.textField}
      />
      <FormControlLabel
        control={(() => (
          <Checkbox checked={isCaseSensitive} onChange={(e) => setIsCaseSensitive(e.target.checked)} color="primary" />
        ))()}
        label="case sensitive"
      />
    </>
  );
}

StringFilterForm.propTypes = {
  filter: PropTypes.object,
  openFiltersList: PropTypes.func,
  setActiveFilter: PropTypes.func,
};

export default StringFilterForm;
