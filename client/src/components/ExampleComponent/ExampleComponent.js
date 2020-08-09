import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlarmIcon from '@material-ui/icons/Alarm';
import Button from '../shared/Button';
import TextField from '../shared/TextField';
import Select from '../shared/Select';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 20
    // minHeight: '100vh',
  }
}

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
          value='value'
          onChange={()=>{}}
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
    </div>
  );
};


export default withStyles(styles)(ExampleComponent);
