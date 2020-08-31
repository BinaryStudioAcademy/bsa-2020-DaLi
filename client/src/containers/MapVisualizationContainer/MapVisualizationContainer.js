import React from 'react';
import PropTypes from 'prop-types';
import { MapVisualizationGoogle, MapVisualizationSchematic, MapVisualizationGoogleHeat } from '../../components';
import schematicMap from './newYork.json';

const MapVisualizationContainer = ({ data, config }) => {
  const chooseMapView = () => {
    let mapView;
    switch (config.view) {
      case 'Google bubble map':
        mapView = <MapVisualizationGoogle data={data} settings={config} />;
        break;
      case 'D3 bubble map':
        mapView = <MapVisualizationSchematic schematicMap={schematicMap} data={data} settings={config} />;
        break;
      case 'Google heat map':
        mapView = <MapVisualizationGoogleHeat data={data} settings={config} />;
        break;
      default:
        break;
    }
    return mapView;
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
      id="mapVisualization"
    >
      {chooseMapView()}
    </div>
  );
};

MapVisualizationContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default MapVisualizationContainer;
