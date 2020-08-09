import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
    maxWidth: '400px',
    flexDirection: 'column',
  },
  backBtn: {
    marginBottom: '2rem',
    alignSelf: 'flex-start',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  tab: {
    minWidth: 100,
    backgroundColor: '#519ee3',
    color: 'white',
    borderRadius: '2rem',
    marginRight: '1rem',
    padding: '0.5rem',
  },
  indicator: {
    display: 'none',
  },
  btn: {
    backgroundColor: '#519ee3',
    color: 'white',
    borderRadius: '2rem',
    padding: '1rem 4rem',
  },
  btnWrapper: {
    marginTop: 'auto',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
    maxWidth: 300,
    display: 'block',
    marginBottom: '3rem',
  },
  select: {
    maxWidth: '300px',
    width: 300,
  },
  label: {
    fontSize: 'bold',
    fontWeight: '2rem',
  },
}));

function LineChartSettings() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state] = React.useState({
    xAxis: '',
    yAxis: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Button className={classes.backBtn}>
        <ArrowBackIosIcon />
        Line Options
      </Button>
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        variant="fullWidth"
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab className={classes.tab} label="Data" {...a11yProps(0)} />
        <Tab className={classes.tab} label="Display" {...a11yProps(1)} />
        <Tab className={classes.tab} label="Labels" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="x-native-label-placeholder">
            X-Axis
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={state.age}
            onChange={() => {}}
            inputProps={{
              xAxis: 'products',
              id: 'x-native-label-placeholder',
            }}
          >
            <option value="">Select a field</option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="y-native-label-placeholder">
            Y-Axis
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={state.age}
            onChange={() => {}}
            inputProps={{
              yAxis: 'products',
              id: 'y-native-label-placeholder',
            }}
          >
            <option value="">Select a field</option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <div className={classes.btnWrapper}>
        <Button className={classes.btn}>Done</Button>
      </div>
    </div>
  );
}

export default LineChartSettings;
