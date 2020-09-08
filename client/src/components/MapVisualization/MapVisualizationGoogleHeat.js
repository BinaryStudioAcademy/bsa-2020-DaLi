import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import config from '../../config/index';
import './styles.css';

const MapVisualizationGoogleHeat = ({ updateConfig, data, settings }) => {
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

  const onChange = ({ center, zoom }) => {
    if (updateConfig) {
      updateConfig({ ...settings, mapCenter: center, zoom });
    }
  };

  return (
    <GoogleMapReact
      options={options}
      center={settings.mapCenter}
      zoom={settings.zoom}
      bootstrapURLKeys={{ key: API_GOOGLE_KEY, libraries: 'visualization' }}
      heatmapLibrary
      heatmap={heatMapData}
      onChange={onChange}
    />
  );
};

MapVisualizationGoogleHeat.propTypes = {
  updateConfig: PropTypes.func,
  data: PropTypes.array,
  settings: PropTypes.object,
};

export default MapVisualizationGoogleHeat;
