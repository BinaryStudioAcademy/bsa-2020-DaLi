import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlarmIcon from '@material-ui/icons/Alarm';
import PropTypes from 'prop-types';
import { Button, TextField, Select, Checkbox, Radio, RadioGroup, FormControlLabel, Switch } from '../shared';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 20,
    // minHeight: '100vh',
  },
};

const ExampleComponent = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div>
        <Button size="large" variant="outlined" onClick={() => alert('primary outlined')}>
          Primary
        </Button>
        <Button startIcon={<AlarmIcon />} color="primary" variant="outlined" onClick={() => alert('primary outlined')}>
          Primary
        </Button>
        <Button
          endIcon={<AlarmIcon />}
          color="secondary"
          variant="contained"
          onClick={() => alert('secondary contained')}
        >
          Secondary
        </Button>
      </div>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
      <form>
        <Select
          native
          value="value"
          onChange={() => {}}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </form>
      <div>
        <Checkbox checked onChange={() => {}} inputProps={{ 'aria-label': 'primary checkbox' }} />
        <Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
        <Checkbox disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
        <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
        <Checkbox defaultChecked indeterminate inputProps={{ 'aria-label': 'indeterminate checkbox' }} />
        <Checkbox defaultChecked color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
        <Checkbox defaultChecked size="small" inputProps={{ 'aria-label': 'checkbox with small size' }} />
      </div>
      <div>
        <Radio checked onChange={() => {}} value="a" name="radio-button-demo" inputProps={{ 'aria-label': 'A' }} />
        <Radio checked onChange={() => {}} value="b" name="radio-button-demo" inputProps={{ 'aria-label': 'B' }} />
        <Radio
          checked
          onChange={() => {}}
          value="d"
          color="default"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'D' }}
        />
        <Radio
          checked
          onChange={() => {}}
          value="e"
          color="default"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'E' }}
          size="small"
        />
      </div>
      <RadioGroup aria-label="gender" name="gender1" value="Gender" onChange={() => {}}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
      </RadioGroup>
      <form>
        <FormControlLabel control={<Switch checked onChange={() => {}} name="checkedA" />} label="Secondary" />
        <FormControlLabel
          control={<Switch checked onChange={() => {}} name="checkedB" color="primary" />}
          label="Primary"
        />
        <FormControlLabel control={<Switch />} label="Uncontrolled" />
        <FormControlLabel disabled control={<Switch />} label="Disabled" />
        <FormControlLabel disabled control={<Switch checked />} label="Disabled" />
      </form>
    </div>
  );
};

ExampleComponent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ExampleComponent);
