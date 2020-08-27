import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import { FormControl, InputLabel } from '@material-ui/core';
import { useStyles } from './styles';

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

const MapSettingsSidebar = ({ updateConfig, config: oldConfig }) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [viewName, setViewName] = useState(oldConfig.view);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeView = (viewName) => {
    setViewName(viewName);
  };

  const onDoneButton = () => {
    updateConfig({ ...oldConfig, view: viewName });
  };

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
          <InputLabel className={classes.label} shrink id="Longitude">
            Longitude
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={viewName}
            onChange={(event) => {
              changeView(event.target.value);
            }}
          >
            <option value="Google heat map" key="google-heat">
              Google heat map
            </option>
            <option value="Google bubble map" key="google-bubble">
              Google bubble map
            </option>
            <option value="D3 bubble map" key="d3-bubble">
              D3 bubble map
            </option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink id="Latitude">
            Latitude
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={viewName}
            onChange={(event) => {
              changeView(event.target.value);
            }}
          >
            <option value="Google heat map" key="google-heat">
              Google heat map
            </option>
            <option value="Google bubble map" key="google-bubble">
              Google bubble map
            </option>
            <option value="D3 bubble map" key="d3-bubble">
              D3 bubble map
            </option>
          </NativeSelect>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink id="xAxis-native-helper">
            Map View
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={viewName}
            onChange={(event) => {
              changeView(event.target.value);
            }}
          >
            <option value="Google heat map" key="google-heat">
              Google heat map
            </option>
            <option value="Google bubble map" key="google-bubble">
              Google bubble map
            </option>
            <option value="D3 bubble map" key="d3-bubble">
              D3 bubble map
            </option>
          </NativeSelect>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Labels
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

MapSettingsSidebar.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
};

export default MapSettingsSidebar;
