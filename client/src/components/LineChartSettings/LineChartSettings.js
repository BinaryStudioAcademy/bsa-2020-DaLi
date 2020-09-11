/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ColorPicker from 'material-ui-color-picker';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles, switchStyles } from './styles';

const PrettySwitch = (props) => {
  const classes = switchStyles();
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
};

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
      {value === index && <Box p={3}>{children}</Box>}
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

function LineChartSettings({ updateConfig, config: oldConfig }) {
  const classes = useStyles();

  const { XAxis, YAxis } = oldConfig.axisData;
  const {
    goal,
    color: barColor,
    lineType: oldLineType,
    showDataPointsValues: incomingShowDataPointsValues,
    trendline,
  } = oldConfig.display;
  const isSummarize = oldConfig.isSummarize || false;
  const [value, setValue] = useState(0);
  const [xAxis, setXAxis] = useState(XAxis.key || XAxis.availableKeys[0]);
  const [yAxis, setYAxis] = useState(YAxis.key || [YAxis.availableKeys[0]]);
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
  const [lineType, setLineType] = useState(oldLineType);
  const [polynomialOrder, setPolynomialOrder] = useState(trendline.polynomial.order);
  const [config, setConfig] = useState(oldConfig);
  const [errors, setErrors] = useState({
    labelXAxis: false,
    labelYAxis: false,
  });

  const validateField = (name, value) => {
    if (name === 'labelXAxis' || name === 'labelYAxis') {
      setErrors({ ...errors, [name]: value.length > 20 });
    }
  };

  const isError = () => Object.values(errors).includes(true);

  useEffect(() => {
    updateConfig(config);
  }, [updateConfig, config]);

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
        lineType,
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
      schema: oldConfig.schema,
      summarize: oldConfig.summarize,
    });
  };

  const colorList = ['blue', 'red', 'green', 'orange', 'purple', 'indigo', 'cyan', 'teal', 'lime', 'yellow'];

  const addLine = () => {
    if (yAxis.length < YAxis.availableKeys.length) {
      const availableKeys = [...YAxis.availableKeys].filter((item) => !yAxis.includes(item));
      setYAxis([...yAxis, availableKeys[0]]);
      setColor([...color, colorList[yAxis.length % 10]]);
      setLineType([...lineType, 'curveNatural']);
    }
  };

  const deleteLine = (id) => {
    const newYAxes = [...yAxis];
    newYAxes.splice(id, 1);
    setYAxis(newYAxes);
    const newColors = [...color];
    newColors.splice(id, 1);
    setColor(newColors);
    const newLineTypes = [...lineType];
    newLineTypes.splice(id, 1);
    setLineType(newLineTypes);
  };

  const valuesX = !isSummarize ? (
    XAxis.availableKeys.map((value) => (
      <option value={value} key={value}>
        {value}
      </option>
    ))
  ) : (
    <option key={XAxis.label}>{XAxis.label}</option>
  );
  const valuesY = !isSummarize ? (
    YAxis.availableKeys.map((value) => (
      <option value={value} key={value}>
        {value}
      </option>
    ))
  ) : (
    <option key={YAxis.label}>{YAxis.label}</option>
  );

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
            disabled={isSummarize}
            onChange={(event) => {
              setXAxis(event.target.value);
              setLabelXAxis(event.target.value);
            }}
            inputProps={{
              id: 'xAxis-native-helper',
              name: 'xAxis',
            }}
          >
            {valuesX}
          </NativeSelect>
        </FormControl>

        <InputLabel className={classes.label} shrink htmlFor="yAxis-native-helper">
          Y-Axis
        </InputLabel>
        {yAxis.map((value, index) => (
          <FormControl key={`line${index}`} className={classes.ySelectControl}>
            <div className={classes.ySelectItem}>
              <NativeSelect
                className={classes.select}
                value={value}
                disabled={isSummarize}
                onChange={(event) => {
                  const newYAxes = [...yAxis];
                  newYAxes[index] = event.target.value;
                  setYAxis(newYAxes);
                  if (yAxis.length === 1) {
                    setLabelYAxis(event.target.value);
                  }
                }}
                inputProps={{
                  id: 'yAxis-native-helper',
                  name: 'yAxis',
                }}
              >
                {valuesY}
              </NativeSelect>
              {yAxis.length > 1 ? <CloseIcon fontSize="default" onClick={() => deleteLine(index)} /> : null}
            </div>
          </FormControl>
        ))}
        <Button variant="contained" disabled={isSummarize} className={classes.addSeriesBtn} onClick={addLine}>
          Add another series
        </Button>
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
        {yAxis.length < 2 ? (
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
        ) : null}
        {showTrendline && yAxis.length < 2 ? (
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
        {yAxis.map((value, index) => (
          <React.Fragment key={`color-line-${index}`}>
            <ColorPicker
              className={classes.colorPicker}
              key={`color-${index}`}
              name="color"
              defaultValue={`${value} color`}
              value={color[index]}
              onChange={(newColor) => {
                const newColors = [...color];
                newColors[index] = newColor;
                setColor(newColors);
              }}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.legend}>
                Line style
              </FormLabel>
              <ToggleButtonGroup
                key={`lineType-${index}`}
                className={classes.btnGroup}
                value={lineType[index]}
                exclusive
                onChange={(event, newLineType) => {
                  const newLineTypes = [...lineType];
                  newLineTypes[index] = newLineType;
                  setLineType(newLineTypes);
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
          </React.Fragment>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FormControlLabel
          control={
            <PrettySwitch
              checked={isSummarize ? true : isLabelXAxis}
              onChange={(event) => setIsLabelXAxis(event.target.checked)}
            />
          }
          label="Show label on x-axis"
          disabled={isSummarize}
        />
        {isLabelXAxis && !isSummarize ? (
          <TextField
            id="XAxis"
            label="X-axis label"
            className={classes.input}
            disabled={isSummarize}
            InputLabelProps={{
              shrink: true,
            }}
            value={labelXAxis}
            onChange={(event) => {
              setLabelXAxis(event.target.value);
              validateField('labelXAxis', event.target.value);
            }}
            helperText={errors.labelXAxis ? '20 characters is max' : null}
            error={errors.labelXAxis}
          />
        ) : null}
        <FormControlLabel
          control={
            <PrettySwitch
              checked={isSummarize ? true : isLabelYAxis}
              onChange={(event) => setIsLabelYAxis(event.target.checked)}
            />
          }
          label="Show label on y-axis"
          disabled={isSummarize}
        />
        {isLabelYAxis && !isSummarize ? (
          <TextField
            id="YAxis"
            label="Y-axis label"
            className={classes.input}
            disabled={isSummarize}
            InputLabelProps={{
              shrink: true,
            }}
            value={labelYAxis}
            onChange={(event) => {
              setLabelYAxis(event.target.value);
              validateField('labelYAxis', event.target.value);
            }}
            helperText={errors.labelYAxis ? '20 characters is max' : null}
            error={errors.labelYAxis}
          />
        ) : null}
      </TabPanel>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.btn}
          onClick={() => {
            onDoneButton();
          }}
          disabled={isError()}
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
