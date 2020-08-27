import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import Marker from './Marker';
import './styles.css';

const MapVisualizationGoogle = ({ data }) => {
  const displayMarkers = () => {
    return data.map((location, index) => {
      return <Marker key={index} lat={location.lat} lng={location.lng} />;
    });
  };

  return (
    <GoogleMapReact
      defaultCenter={{ lat: 40.658755, lng: -73.943635 }}
      defaultZoom={11}
      bootstrapURLKeys={{ key: 'AIzaSyDDqI4sXO6zvU1PZJyZoUTV6DISqOUYclg' }}
    >
      {displayMarkers()}
    </GoogleMapReact>
  );
};

MapVisualizationGoogle.propTypes = {
  data: PropTypes.array,
};

export default MapVisualizationGoogle;
