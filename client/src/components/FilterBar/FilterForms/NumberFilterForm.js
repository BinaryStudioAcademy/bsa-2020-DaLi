import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  goBackBtn: {
    width: '100%',
    marginBottom: 20,
  },
  textField: {
    marginTop: 20,
  },
}));

function NumberFilterForm({ filter, openFiltersList, setActiveFilter, setApplyButtonDisabled }) {
  const classes = useStyles();
  //   string filter model : {
  //     type: 'string',
  //     name: 'name',
  //     greaterThan: min number from input,
  //     lessThan: max number from input,
  //   }

  const [notificationMessage, setNotificationMessage] = useState('');

  const [numberFormatPicker, setNumberFormatPicker] = useState('between');

  const [greaterThan, setGreaterThan] = useState(filter.greaterThan || '');
  const [lessThan, setLessThan] = useState(filter.lessThan || '');

  useEffect(() => {
    setActiveFilter((filter) => ({ ...filter, lessThan, greaterThan }));
  }, [greaterThan, lessThan, setActiveFilter]);

  const onBetweenSelectLessThanHandler = (value) => {
    if (!greaterThan || +value > +greaterThan) {
      setApplyButtonDisabled(false);
    } else {
      setApplyButtonDisabled(true);
      setNotificationMessage('the upper limit cannot be lower than the lower');
    }
    setLessThan(value);
  };

  const onBetweenSelectGreaterThanHandler = (value) => {
    if (!lessThan || +value < +lessThan) {
      setApplyButtonDisabled(false);
    } else {
      setApplyButtonDisabled(true);
      setNotificationMessage('the lower limit cannot be higher than the upper one');
    }
    setGreaterThan(value);
  };

  const chooseNumberFilterForm = (numberFormatPicker) => {
    switch (numberFormatPicker) {
      case 'between':
        return (
          <>
            <TextField
              value={greaterThan}
              onInput={(e) => {
                const value = e.target.value.slice(0, 20);
                onBetweenSelectGreaterThanHandler(value);
              }}
              type="number"
              className={classes.textField}
              helperText="FROM"
            />
            <TextField
              value={lessThan}
              onInput={(e) => {
                const value = e.target.value.slice(0, 20);
                onBetweenSelectLessThanHandler(value);
              }}
              type="number"
              className={classes.textField}
              helperText="TO"
            />
          </>
        );

      case 'greaterThan':
        return (
          <TextField
            value={greaterThan}
            onInput={(e) => {
              const value = e.target.value.slice(0, 20);
              setGreaterThan(value);
              setLessThan('');
            }}
            type="number"
            className={classes.textField}
          />
        );

      case 'lessThan':
        return (
          <TextField
            value={lessThan}
            onInput={(e) => {
              const value = e.target.value.slice(0, 20);
              setLessThan(value);
              setGreaterThan('');
            }}
            type="number"
            className={classes.textField}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Button variant="outlined" color="primary" className={classes.goBackBtn} onClick={openFiltersList}>
        Back to filters list
      </Button>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          value={numberFormatPicker}
          onChange={(e) => {
            const value = e.target.value;
            setApplyButtonDisabled(false);
            if (value === 'between') {
              onBetweenSelectLessThanHandler(lessThan);
              onBetweenSelectGreaterThanHandler(greaterThan);
            }
            setNumberFormatPicker(value);
          }}
        >
          <MenuItem value="between">between</MenuItem>
          <MenuItem value="greaterThan">greater equal than</MenuItem>
          <MenuItem value="lessThan">less equal than</MenuItem>
        </Select>
      </FormControl>
      {chooseNumberFilterForm(numberFormatPicker)}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!notificationMessage}
        autoHideDuration={4000}
        transitionDuration={0}
        onClose={() => setNotificationMessage('')}
      >
        <Alert elevation={6} variant="filled" severity="error" onClose={() => setNotificationMessage('')}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

NumberFilterForm.propTypes = {
  filter: PropTypes.object,
  openFiltersList: PropTypes.func,
  setActiveFilter: PropTypes.func,
  setApplyButtonDisabled: PropTypes.func,
};

export default NumberFilterForm;
