import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import Marker from './Marker';
import config from '../../config/index';
import './styles.css';

const MapVisualizationGoogle = ({ data, settings }) => {
  const [locationNameForInfo, setLocationNameForInfo] = useState('');

  const API_GOOGLE_KEY = config.api.google;

  const showTip = (locationName) => {
    setLocationNameForInfo(locationName);
  };

  const hideTip = () => {
    setLocationNameForInfo('');
  };

  const displayMarkers = () => {
    return data.map((location, index) => {
      return (
        <Marker
          key={index}
          name={location[settings.name]}
          lat={location[settings.latitude]}
          lng={location[settings.longitude]}
          color={settings.color}
          showTip={showTip}
          hideTip={hideTip}
          locationNameForInfo={locationNameForInfo}
        />
      );
    });
  };

  const options = settings.isSatellite ? { mapTypeId: 'satellite' } : { mapTypeId: 'roadmap' };

  return (
    <GoogleMapReact
      options={options}
      defaultCenter={{ lat: 40.71274, lng: -74.005974 }}
      defaultZoom={4}
      bootstrapURLKeys={{ key: API_GOOGLE_KEY }}
    >
      {settings.longitude && settings.latitude ? displayMarkers() : null}
    </GoogleMapReact>
  );
};

MapVisualizationGoogle.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.object,
};

export default MapVisualizationGoogle;
