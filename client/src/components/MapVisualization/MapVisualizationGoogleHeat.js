import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import config from '../../config/index';
import './styles.css';

const MapVisualizationGoogleHeat = ({ data, settings }) => {
  const API_GOOGLE_KEY = config.api.google;
  const positions = data.map((location) => {
    return {
      ...location,
      lat: location[settings.latitude] || '',
      lng: location[settings.longitude] || '',
    };
  });

  const heatMapData = {
    positions,
    options: {
      radius: 20,
      opacity: 0.6,
    },
  };

  const options = settings.isSatellite ? { mapTypeId: 'satellite' } : { mapTypeId: 'roadmap' };

  return (
    <GoogleMapReact
      options={options}
      defaultCenter={{ lat: 40.71274, lng: -74.005974 }}
      defaultZoom={4}
      bootstrapURLKeys={{ key: API_GOOGLE_KEY, libraries: 'visualization' }}
      heatmapLibrary
      heatmap={heatMapData}
    />
  );
};

MapVisualizationGoogleHeat.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.object,
};

export default MapVisualizationGoogleHeat;
