import React from 'react';
import PropTypes from 'prop-types';
import { MapVisualizationGoogle, MapVisualizationSchematic, MapVisualizationGoogleHeat } from '../../components';
import schematicMapNewYork from './newYork.json';
import schematicMapWorld from './world.json';

const MapVisualizationContainer = ({ data, config }) => {
  const chooseMapView = () => {
    let mapView;
    switch (config.view) {
      case 'Google bubble map':
        mapView = <MapVisualizationGoogle data={data} settings={config} />;
        break;
      case 'D3 bubble map':
        mapView = (
          <MapVisualizationSchematic schematicMap={schematicMapNewYork} data={data} radius={5} settings={config} />
        );
        break;
      case 'Google heat map':
        mapView = <MapVisualizationGoogleHeat data={data} settings={config} />;
        break;
      case 'D3 world bubble map':
        mapView = (
          <MapVisualizationSchematic schematicMap={schematicMapWorld} data={data} radius={2} settings={config} />
        );
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
