import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1CD1A1',
    },
    secondary: {
      main: '#FAA9C6',
    },
    text: {
      primary: '#4E4E4E',
      secondary: '#858585',
    },
    background: {
      default: '#FAFAFA',
    },
  },
});

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  goBackBtn: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    marginTop: 20,
    marginRight: 5,
  },
}));

function DateFilterForm({ filter, openFiltersList, setActiveFilter }) {
  const classes = useStyles();
  //   date filter model : {
  //     type: 'date',
  //     name: 'name',
  //     greaterThan: min date value,
  //     lessThan: max date value,
  //   }

  const [notificationMessage, setNotificationMessage] = useState('');

  const [dateFormatPicker, setDateFormatPicker] = useState('between');
  const [dateUnitType, setDateUnitType] = useState('days');
  const [dateUnitCount, setDateUnitCount] = useState(10);

  const [greaterThan, setGreaterThan] = useState(filter.greaterThan ? new Date(filter.greaterThan) : null);
  const [lessThan, setLessThan] = useState(filter.lessThan ? new Date(filter.lessThan) : null);

  const onBetweenSelectLessThanHandler = (date) => {
    if (!greaterThan || new Date(date) > greaterThan) {
      setLessThan(date);
    } else {
      setNotificationMessage('the upper limit cannot be lower than the lower');
    }
  };

  const onBetweenSelectGreaterThanHandler = (date) => {
    if (!lessThan || new Date(date) < lessThan) {
      setGreaterThan(date);
    } else {
      setNotificationMessage('the lower limit cannot be higher than the upper one');
    }
  };

  const chooseDatePickerForm = (datePickerFormat) => {
    switch (datePickerFormat) {
      case 'between':
        return (
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                clearable
                value={greaterThan}
                onChange={onBetweenSelectGreaterThanHandler}
                helperText="FROM"
                className={classes.input}
              />
              <DateTimePicker
                clearable
                value={lessThan}
                onChange={onBetweenSelectLessThanHandler}
                helperText="TO"
                className={classes.input}
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        );

      case 'previous':
      case 'next':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TextField
              value={dateUnitCount}
              onInput={(e) => {
                const value = Math.max(1, parseInt(e.target.value || 1))
                  .toString()
                  .slice(0, 3);

                setDateUnitCount(value);
              }}
              type="number"
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <Select value={dateUnitType} onChange={(e) => setDateUnitType(e.target.value)}>
                <MenuItem value="days">days</MenuItem>
                <MenuItem value="weeks">weeks</MenuItem>
                <MenuItem value="months">months</MenuItem>
                <MenuItem value="quarters">quarters</MenuItem>
                <MenuItem value="years">years</MenuItem>
              </Select>
            </FormControl>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    setActiveFilter((filter) => ({ ...filter, lessThan, greaterThan }));
  }, [greaterThan, lessThan, setActiveFilter]);

  useEffect(() => {
    const currentDate = moment();
    switch (dateFormatPicker) {
      case 'today': {
        const startToday = currentDate.clone().startOf('day').utc();
        const finishToday = currentDate.clone().endOf('day').utc();

        setGreaterThan(startToday);
        setLessThan(finishToday);
        break;
      }

      case 'thisWeek': {
        const startOfThisWeek = currentDate.clone().startOf('isoWeek').utc();
        const finishOfThisWeek = currentDate.clone().endOf('isoWeek').utc();

        setGreaterThan(startOfThisWeek);
        setLessThan(finishOfThisWeek);
        break;
      }

      case 'thisMonth': {
        const startOfThisMonth = currentDate.clone().startOf('month').utc();
        const finishOfThisMonth = currentDate.clone().endOf('month').utc();

        setGreaterThan(startOfThisMonth);
        setLessThan(finishOfThisMonth);
        break;
      }

      case 'thisQuarter': {
        const startOfThisQuarter = currentDate.clone().startOf('quarter').utc();
        const finishOfThisQuarter = currentDate.clone().endOf('quarter').utc();

        setGreaterThan(startOfThisQuarter);
        setLessThan(finishOfThisQuarter);
        break;
      }

      case 'thisYear': {
        const startOfThisYear = currentDate.clone().startOf('year').utc();
        const finishOfThisYear = currentDate.clone().endOf('year').utc();

        setGreaterThan(startOfThisYear);
        setLessThan(finishOfThisYear);
        break;
      }

      case 'next': {
        const unitType = dateUnitType.slice(0, -1) === 'week' ? 'isoWeek' : dateUnitType.slice(0, -1);
        const nextDateUnit = currentDate.clone().add(dateUnitCount, dateUnitType);

        const start = currentDate.clone().endOf(unitType).utc();
        const finish = nextDateUnit.clone().endOf(unitType).utc();

        setGreaterThan(start);
        setLessThan(finish);
        break;
      }

      case 'previous': {
        const unitType = dateUnitType.slice(0, -1) === 'week' ? 'isoWeek' : dateUnitType.slice(0, -1);
        const prevDateUnit = currentDate.clone().subtract(dateUnitCount, dateUnitType);

        const start = prevDateUnit.clone().startOf(unitType).utc();
        const finish = currentDate.clone().startOf(unitType).utc();

        setGreaterThan(start);
        setLessThan(finish);
        break;
      }

      default:
        break;
    }
  }, [dateFormatPicker, dateUnitType, dateUnitCount]);

  return (
    <>
      <Button variant="outlined" color="primary" className={classes.goBackBtn} onClick={openFiltersList}>
        Back to filters list
      </Button>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select value={dateFormatPicker} onChange={(e) => setDateFormatPicker(e.target.value)}>
          <MenuItem value="between">between</MenuItem>
          <MenuItem value="next">next</MenuItem>
          <MenuItem value="previous">previous</MenuItem>
          <MenuItem value="today">today</MenuItem>
          <MenuItem value="thisWeek">this week</MenuItem>
          <MenuItem value="thisMonth">this month</MenuItem>
          <MenuItem value="thisQuarter">this quarter</MenuItem>
          <MenuItem value="thisYear">this year</MenuItem>
        </Select>
      </FormControl>
      {chooseDatePickerForm(dateFormatPicker)}
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

DateFilterForm.propTypes = {
  filter: PropTypes.object,
  openFiltersList: PropTypes.func,
  setActiveFilter: PropTypes.func,
};

export default DateFilterForm;
