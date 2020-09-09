import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

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

function DateFilterForm({ filter, openFiltersList, setActiveFilter }) {
  const classes = useStyles();
  //   date filter model : {
  //     type: 'date',
  //     name: 'name',
  //     greaterThan: min date value,
  //     lessThan: max date value,
  //   }

  const [dateFormatPicker, setDateFormatPicker] = useState('next');
  const [dateUnitType, setDateUnitType] = useState('days');
  const [dateUnitCount, setDateUnitCount] = useState(10);

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

      case 'previous':
      case 'next':
        return (
          <>
            <TextField
              value={dateUnitCount}
              onInput={(e) => {
                const value = Math.max(1, parseInt(e.target.value || 1))
                  .toString()
                  .slice(0, 3);

                setDateUnitCount(value);
              }}
              helperText="date unit number"
              type="number"
              className={classes.textField}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <Select value={dateUnitType} onChange={(e) => setDateUnitType(e.target.value)}>
                <MenuItem value="hours">hours</MenuItem>
                <MenuItem value="days">days</MenuItem>
                <MenuItem value="weeks">weeks</MenuItem>
                <MenuItem value="months">months</MenuItem>
                <MenuItem value="quarters">quarters</MenuItem>
                <MenuItem value="years">years</MenuItem>
              </Select>
            </FormControl>
          </>
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

        setGreaterThen(startToday);
        setLessThan(finishToday);
        break;
      }

      case 'thisWeek': {
        const startOfThisWeek = currentDate.clone().startOf('isoWeek').utc();
        const finishOfThisWeek = currentDate.clone().endOf('isoWeek').utc();

        setGreaterThen(startOfThisWeek);
        setLessThan(finishOfThisWeek);
        break;
      }

      case 'thisMonth': {
        const startOfThisMonth = currentDate.clone().startOf('month').utc();
        const finishOfThisMonth = currentDate.clone().endOf('month').utc();

        setGreaterThen(startOfThisMonth);
        setLessThan(finishOfThisMonth);
        break;
      }

      case 'thisQuarter': {
        const startOfThisQuarter = currentDate.clone().startOf('quarter').utc();
        const finishOfThisQuarter = currentDate.clone().endOf('quarter').utc();

        setGreaterThen(startOfThisQuarter);
        setLessThan(finishOfThisQuarter);
        break;
      }

      case 'thisYear': {
        const startOfThisYear = currentDate.clone().startOf('year').utc();
        const finishOfThisYear = currentDate.clone().endOf('year').utc();

        setGreaterThen(startOfThisYear);
        setLessThan(finishOfThisYear);
        break;
      }

      case 'next': {
        const unitType = dateUnitType.slice(0, -1) === 'week' ? 'isoWeek' : dateUnitType.slice(0, -1);
        const nextDateUnit = currentDate.clone().add(dateUnitCount, dateUnitType);

        const start = currentDate.clone().endOf(unitType).utc();
        const finish = nextDateUnit.clone().endOf(unitType).utc();

        setGreaterThen(start);
        setLessThan(finish);
        break;
      }

      case 'previous': {
        const unitType = dateUnitType.slice(0, -1) === 'week' ? 'isoWeek' : dateUnitType.slice(0, -1);
        const prevDateUnit = currentDate.clone().subtract(dateUnitCount, dateUnitType);

        const start = prevDateUnit.clone().startOf(unitType).utc();
        const finish = currentDate.clone().startOf(unitType).utc();

        setGreaterThen(start);
        setLessThan(finish);
        break;
      }

      default:
        break;
    }
  }, [dateFormatPicker, dateUnitType, dateUnitCount]);

  return (
    <>
      <Button className={classes.goBackBtn} onClick={openFiltersList}>
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
    </>
  );
}

DateFilterForm.propTypes = {
  filter: PropTypes.object,
  openFiltersList: PropTypes.func,
  setActiveFilter: PropTypes.func,
};

export default DateFilterForm;
