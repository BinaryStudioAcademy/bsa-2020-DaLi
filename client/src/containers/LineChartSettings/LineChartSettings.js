import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ColorPicker from 'material-ui-color-picker';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useStyles } from './styles';

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

const testConfig = {
  axisData: {
    XAxis: {
      availableKeys: ['key1', 'key2', 'key3'],
      key: 'createdAt',
      label: 'Total',
      displayLabel: true,
    },
    YAxis: {
      availableKeys: ['key4', 'key5', 'key6'],
      key: 'total',
      label: 'Date',
      displayLabel: true,
    },
  },
  display: {
    goal: {
      display: true,
      value: 100,
      label: 'Goal',
    },
    color: '#4aa1de',
    lineType: 'curveNatural',
    trendline: {
      display: false,
      trendlineType: 'linear',
      availableTrendlineTypes: ['linear', 'polynomial', 'exponential', 'logarithmical'],
      polynomial: {
        availableOrders: [2, 3, 4, 5],
        order: 2,
      },
    },
    showDataPointsValues: true,
  },
};

function LineChartSettings({ updateConfig, config: oldConfig } /* , oldConfig = testConfig */) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [config, setConfig] = useState(testConfig);

  useEffect(() => {
    setConfig(oldConfig);
  }, [config]);

  const { axisData, display } = config;
  const { XAxis, YAxis } = axisData;
  const { goal, color, showDataPointsValues, trendline, lineType } = display;
  // const { display: showTrendline } = trendline;
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
              checked={trendline.display}
              onChange={(event) => {
                display.trendline.display = event.target.checked;
                setConfig({ ...config, display });
              }}
            />
          ))()}
          label="Show trendline"
        />
        {trendline.display ? (
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.legend}>
              Trendline type
            </FormLabel>
            <ToggleButtonGroup
              className={classes.btnGroup}
              value={trendline.trendlineType}
              exclusive
              onChange={(event, newTrendLineType) => {
                display.trendline.trendlineType = newTrendLineType;
                setConfig({ ...config, display });
              }}
              aria-label="trendlineType"
            >
              <ToggleButton
                classes={{ root: classes.btnItem, selected: classes.selected }}
                value="linear"
                aria-label="linear"
              >
                Line
              </ToggleButton>
              <ToggleButton
                classes={{ root: classes.btnItem, selected: classes.selected }}
                value="polynomial"
                aria-label="polynomial"
              >
                Poly
              </ToggleButton>
              <ToggleButton
                classes={{ root: classes.btnItem, selected: classes.selected }}
                value="exponential"
                aria-label="exponential"
              >
                Exp
              </ToggleButton>
              <ToggleButton
                classes={{ root: classes.btnItem, selected: classes.selected }}
                value="logarithmical"
                aria-label="logarithmical"
              >
                Log
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
        ) : null}
        {trendline.display && trendline.trendlineType === 'polynomial' ? (
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.legend}>
              Order
            </FormLabel>
            <ToggleButtonGroup
              className={classes.btnGroup}
              value={trendline.polynomial.order.toString()}
              exclusive
              onChange={(event, order) => {
                display.trendline.polynomial.order = parseInt(order);
                setConfig({ ...config, display });
              }}
              aria-label="trendlinePolynomialOrder"
            >
              <ToggleButton classes={{ root: classes.btnItem, selected: classes.selected }} value="2" aria-label="2">
                2
              </ToggleButton>
              <ToggleButton classes={{ root: classes.btnItem, selected: classes.selected }} value="3" aria-label="3">
                3
              </ToggleButton>
              <ToggleButton classes={{ root: classes.btnItem, selected: classes.selected }} value="4" aria-label="4">
                4
              </ToggleButton>
              <ToggleButton classes={{ root: classes.btnItem, selected: classes.selected }} value="5" aria-label="5">
                5
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
        ) : null}
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
          <FormLabel component="legend" className={classes.legend}>
            Line style
          </FormLabel>
          <ToggleButtonGroup
            className={classes.btnGroup}
            value={lineType}
            exclusive
            onChange={(event, newLineType) => {
              display.lineType = newLineType;
              setConfig({ ...config, display });
            }}
            aria-label="lineType"
          >
            <ToggleButton
              classes={{ root: classes.btnItem, selected: classes.selected }}
              value="curveNatural"
              aria-label="natural"
            >
              Natural
            </ToggleButton>
            <ToggleButton
              classes={{ root: classes.btnItem, selected: classes.selected }}
              value="curveLinear"
              aria-label="linear"
            >
              Linear
            </ToggleButton>
            <ToggleButton
              classes={{ root: classes.btnItem, selected: classes.selected }}
              value="curveStep"
              aria-label="step"
            >
              Step
            </ToggleButton>
          </ToggleButtonGroup>
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
