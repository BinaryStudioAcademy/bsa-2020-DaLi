/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ColorPicker from 'material-ui-color-picker';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormLabel from '@material-ui/core/FormLabel';

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
          <Typography component="span">{children}</Typography>
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
  btnGroup: {
    display: 'flex',
  },
  btnItem: {
    flex: 1,
    marginTop: '5px',
    marginBottom: '10px',
    borderColor: '#519ee3',
    color: 'black',
    textTransform: 'none',
    '&$selected': {
      backgroundColor: '#86BBEB',
      color: 'white',
    },
  },
  selected: {
    backgroundColor: '#86BBEB',
  },
  trendlineSwitch: {
    marginBottom: '20px',
  },
  legend: {
    color: 'black',
    marginTop: '10px',
  },
}));

const BarChartSettings = ({ updateConfig, config: oldConfig }) => {
  const classes = useStyles();

  const { XAxis, YAxis } = oldConfig.axisData;
  const { goal, color: barColor, showDataPointsValues: incomingShowDataPointsValues, trendline } = oldConfig.display;

  const [value, setValue] = useState(0);
  const [xAxis, setXAxis] = useState(XAxis.key || XAxis.availableKeys[0]);
  const [yAxis, setYAxis] = useState(YAxis.key || YAxis.availableKeys[0]);
  const [isGoalLine, setIsGoalLine] = useState(goal.display);
  const [goalLine, setGoalLine] = useState(goal.value);
  const [color, setColor] = useState(barColor);
  const [isLabelXAxis, setIsLabelXAxis] = useState(XAxis.displayLabel);
  const [isLabelYAxis, setIsLabelYAxis] = useState(YAxis.displayLabel);
  const [labelXAxis, setLabelXAxis] = useState(XAxis.label);
  const [labelYAxis, setLabelYAxis] = useState(YAxis.label);
  const [showDataPointsValues, setShowDataPointsValues] = useState(incomingShowDataPointsValues);
  const [showTrendline, setShowTrendline] = useState(trendline.display);
  const [trendlineType, setTrendlineType] = useState(trendline.trendlineType);
  const [polynomialOrder, setPolynomialOrder] = useState(trendline.polynomial.order);
  const [config, setConfig] = useState(oldConfig);

  useEffect(() => {
    updateConfig(config);
  }, [config]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDoneButton = () => {
    setConfig({
      axisData: {
        XAxis: {
          availableKeys: XAxis.availableKeys,
          key: xAxis,
          label: labelXAxis,
          displayLabel: isLabelXAxis,
        },
        YAxis: {
          availableKeys: YAxis.availableKeys,
          key: yAxis,
          label: labelYAxis,
          displayLabel: isLabelYAxis,
        },
      },
      display: {
        goal: {
          display: isGoalLine,
          value: Number.parseInt(goalLine),
          label: 'Goal',
        },
        color,
        trendline: {
          display: showTrendline,
          trendlineType,
          availableTrendlineTypes: ['linear', 'polynomial', 'exponential', 'logarithmical'],
          polynomial: {
            availableOrders: [2, 3, 4, 5],
            order: polynomialOrder,
          },
        },
        showDataPointsValues,
      },
    });
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
          <InputLabel className={classes.label} shrink id="xAxis-native-helper">
            X-Axis
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={xAxis}
            onChange={(event) => setXAxis(event.target.value)}
            inputProps={{
              id: 'xAxis-native-helper',
              name: 'xAxis',
            }}
          >
            {valuesX}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="yAxis-native-helper">
            Y-Axis
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={yAxis}
            onChange={(event) => setYAxis(event.target.value)}
            inputProps={{
              id: 'yAxis-native-helper',
              name: 'yAxis',
            }}
          >
            {valuesY}
          </NativeSelect>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormControlLabel
          control={<PrettySwitch checked={isGoalLine} onChange={(event) => setIsGoalLine(event.target.checked)} />}
          label="Goal line"
        />
        {isGoalLine ? (
          <TextField
            id="standard-basic"
            label="Goal line"
            className={classes.input}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={goalLine}
            onChange={(event) => {
              setGoalLine(event.target.value);
            }}
          />
        ) : null}
        <FormControlLabel
          control={(() => (
            <PrettySwitch
              checked={showDataPointsValues}
              onChange={(event) => {
                setShowDataPointsValues(event.target.checked);
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
                setShowTrendline(event.target.checked);
              }}
            />
          ))()}
          label="Show trendline"
        />
        {showTrendline ? (
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.legend}>
              Trendline type
            </FormLabel>
            <ToggleButtonGroup
              className={classes.btnGroup}
              value={trendlineType}
              exclusive
              onChange={(event, newTrendLineType) => {
                setTrendlineType(newTrendLineType);
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
        {showTrendline && trendlineType === 'polynomial' ? (
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.legend}>
              Order
            </FormLabel>
            <ToggleButtonGroup
              className={classes.btnGroup}
              value={polynomialOrder.toString()}
              exclusive
              onChange={(event, order) => {
                setPolynomialOrder(parseInt(order));
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
          onChange={(color) => setColor(color)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FormControlLabel
          control={<PrettySwitch checked={isLabelXAxis} onChange={(event) => setIsLabelXAxis(event.target.checked)} />}
          label="Show label on x-axis"
        />
        {isLabelXAxis ? (
          <TextField
            id="standard-basic"
            label="X-axis label"
            className={classes.input}
            InputLabelProps={{
              shrink: true,
            }}
            value={labelXAxis}
            onChange={(event) => {
              setLabelXAxis(event.target.value);
            }}
          />
        ) : null}
        <FormControlLabel
          control={<PrettySwitch checked={isLabelYAxis} onChange={(event) => setIsLabelYAxis(event.target.checked)} />}
          label="Show label on y-axis"
        />
        {isLabelYAxis ? (
          <TextField
            id="standard-basic"
            label="Y-axis label"
            className={classes.input}
            InputLabelProps={{
              shrink: true,
            }}
            value={labelYAxis}
            onChange={(event) => {
              setLabelYAxis(event.target.value);
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
};

BarChartSettings.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
  data: PropTypes.array,
};

export default BarChartSettings;
