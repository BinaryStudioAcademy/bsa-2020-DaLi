import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ColorPicker from 'material-ui-color-picker';

const PrettySwitch = withStyles((theme) => ({
  root: {
    width: 60,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    overflow: 'unset',
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(34px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#519EE3',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#519EE3',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

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
          {/* <Typography>{children}</Typography> */}
          {children}
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
    height: '100%',
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
  input: {
    display: 'flex',
    margin: '25px 0px',
  },
  colorPicker: {
    display: 'flex',
    margin: '25px 25px 25px 0',
  },
}));

function LineChartSettings({ updateConfig, config: oldConfig } /* , oldConfig = testConfig */) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [config, setConfig] = useState(oldConfig);

  useEffect(() => {
    updateConfig(config);
  }, [updateConfig, config]);

  const { axisData, display } = config;
  const { XAxis, YAxis } = axisData;
  const { goal, color, showDataPointsValues, trendline, lineType } = display;
  const { display: showTrendline } = trendline;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDoneButton = () => {
    updateConfig(config);
  };

  const valuesX = XAxis.availableKeys.map((value) => (
    <option value={value} key={value}>
      {value}
    </option>
  ));
  const valuesY = YAxis.availableKeys.map((value) => (
    <option value={value} key={value}>
      {value}
    </option>
  ));

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
            value={XAxis.key}
            onChange={(event) => {
              axisData.XAxis.key = event.target.value;
              axisData.XAxis.label = event.target.value;
              setConfig({ ...config, axisData });
            }}
          >
            {valuesX}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="y-native-label-placeholder">
            Y-Axis
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={YAxis.key}
            onChange={(event) => {
              axisData.YAxis.key = event.target.value;
              axisData.YAxis.label = event.target.value;
              setConfig({ ...config, axisData });
            }}
          >
            {valuesY}
          </NativeSelect>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormControlLabel
          control={(() => (
            <PrettySwitch
              checked={goal.display}
              onChange={(event) => {
                display.goal.display = event.target.checked;
                setConfig({ ...config, display });
              }}
            />
          ))()}
          label="Goal line"
        />
        {goal.display ? (
          <TextField
            id="standard-basic"
            label={goal.label}
            className={classes.input}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={goal.value}
            onChange={(event) => {
              display.goal.value = event.target.value;
              setConfig({ ...config, display });
            }}
          />
        ) : null}
        <FormControlLabel
          control={(() => (
            <PrettySwitch
              checked={showDataPointsValues}
              onChange={(event) => {
                display.showDataPointsValues = event.target.checked;
                setConfig({ ...config, display });
              }}
            />
          ))()}
          label="Show values on data points"
        />
        <FormControlLabel
          control={(() => (
            <PrettySwitch
              checked={showTrendline}
              onChange={(event) => {
                display.trendline.display = event.target.checked;
                setConfig({ ...config, display });
              }}
            />
          ))()}
          label="Show trendline"
        />
        <ColorPicker
          className={classes.colorPicker}
          name="color"
          defaultValue="Сhoose your color"
          value={color}
          onChange={(color) => {
            display.color = color;
            setConfig({ ...config, display });
          }}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Line style</FormLabel>
          <RadioGroup
            aria-label="line-style"
            name="lineType"
            value={lineType}
            onChange={(event) => {
              display.lineType = event.target.value;
              setConfig({ ...config, display });
            }}
          >
            <FormControlLabel value="curveNatural" control={<Radio />} label="Natural" />
            <FormControlLabel value="curveLinear" control={<Radio />} label="Linear" />
            <FormControlLabel value="curveStep" control={<Radio />} label="Step" />
          </RadioGroup>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FormControlLabel
          control={(() => (
            <PrettySwitch
              checked={XAxis.displayLabel}
              onChange={(event) => {
                axisData.XAxis.displayLabel = event.target.checked;
                setConfig({ ...config, axisData });
              }}
            />
          ))()}
          label="Show label on x-axis"
        />
        {XAxis.displayLabel ? (
          <TextField
            id="standard-basic"
            label="X-axis label"
            className={classes.input}
            InputLabelProps={{
              shrink: true,
            }}
            value={XAxis.label}
            onChange={(event) => {
              axisData.XAxis.label = event.target.value;
              setConfig({ ...config, axisData });
            }}
          />
        ) : null}
        <FormControlLabel
          control={(() => (
            <PrettySwitch
              checked={YAxis.displayLabel}
              onChange={(event) => {
                axisData.YAxis.displayLabel = event.target.checked;
                setConfig({ ...config, axisData });
              }}
            />
          ))()}
          label="Show label on y-axis"
        />
        {YAxis.displayLabel ? (
          <TextField
            label="Y-axis label"
            className={classes.input}
            InputLabelProps={{
              shrink: true,
            }}
            value={YAxis.label}
            onChange={(event) => {
              axisData.YAxis.label = event.target.value;
              setConfig({ ...config, axisData });
            }}
          />
        ) : null}
      </TabPanel>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.btn}
          onClick={() => {
            onDoneButton();
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

LineChartSettings.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
};

export default LineChartSettings;
