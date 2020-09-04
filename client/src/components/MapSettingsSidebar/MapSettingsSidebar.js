import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import ColorPicker from 'material-ui-color-picker';
import { FormControl, InputLabel, Switch } from '@material-ui/core';
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
  const [isSatellite, setIsSatellite] = useState(oldConfig.isSatellite);
  const [color, setColor] = useState(oldConfig.color);
  const [latitude, setLatitude] = useState(oldConfig.latitude);
  const [longitude, setLongitude] = useState(oldConfig.longitude);
  const [markerName, setMarkerName] = useState(oldConfig.name);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeView = (viewName) => {
    setViewName(viewName);
  };

  const onDoneButton = () => {
    updateConfig({ ...oldConfig, view: viewName, name: markerName, isSatellite, color, longitude, latitude });
  };

  const valuesLat = oldConfig.keys.map((value) => (
    <option value={value} key={value}>
      {value}
    </option>
  ));
  const valuesLng = oldConfig.keys.map((value) => (
    <option value={value} key={value}>
      {value}
    </option>
  ));

  const valuesMarkerName = oldConfig.keys.map((value) => (
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
      </Tabs>
      <TabPanel value={value} index={0}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink id="Name">
            Marker name
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={markerName}
            onChange={(event) => {
              setMarkerName(event.target.value);
            }}
          >
            {valuesMarkerName}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink id="Longitude">
            Longitude
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={longitude}
            onChange={(event) => {
              setLongitude(event.target.value);
            }}
          >
            {valuesLng}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink id="Latitude">
            Latitude
          </InputLabel>
          <NativeSelect
            className={classes.select}
            value={latitude}
            onChange={(event) => {
              setLatitude(event.target.value);
            }}
          >
            {valuesLat}
          </NativeSelect>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink id="map-view">
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
            <option value="D3 world bubble map" key="d3 world bubble map">
              D3 world bubble map
            </option>
          </NativeSelect>
        </FormControl>
        {viewName !== 'D3 bubble map' ? (
          <FormControl className={classes.formControl}>
            <FormControlLabel
              control={(() => (
                <PrettySwitch
                  checked={isSatellite}
                  onChange={(event) => {
                    setIsSatellite(event.target.checked);
                  }}
                />
              ))()}
              label="Satellite view"
            />
          </FormControl>
        ) : null}
        {viewName !== 'Google heat map' ? (
          <ColorPicker
            className={classes.colorPicker}
            name="color"
            defaultValue="Сhoose your color"
            value={color}
            onChange={(color) => setColor(color)}
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

MapSettingsSidebar.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
};

export default MapSettingsSidebar;
