import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import './styles.css';

const MapVisualizationGoogleHeat = ({ data }) => {
  const heatMapData = {
    positions: data,
    options: {
      radius: 20,
      opacity: 0.6,
    },
  };

  return (
    <GoogleMapReact
      options={{ mapTypeId: 'satellite' }}
      defaultCenter={{ lat: 40.658755, lng: -73.943635 }}
      defaultZoom={11}
      bootstrapURLKeys={{ key: 'AIzaSyDDqI4sXO6zvU1PZJyZoUTV6DISqOUYclg' }}
      heatmapLibrary
      heatmap={heatMapData}
    />
  );
};

MapVisualizationGoogleHeat.propTypes = {
  data: PropTypes.array,
};

export default MapVisualizationGoogleHeat;
