import React from 'react';
import PropTypes from 'prop-types';
import { MapVisualizationGoogle, MapVisualizationSchematic, MapVisualizationGoogleHeat } from '../../components';
import schematicMapNewYork from './newYork.json';
import schematicMapWorld from './world.json';

const MapVisualizationContainer = ({ updateConfig, data, config }) => {
  const viewList = config.viewList;
  const chooseMapView = () => {
    let mapView;
    switch (config.view) {
      case viewList[1]:
        mapView = <MapVisualizationGoogleHeat updateConfig={updateConfig} data={data} settings={config} />;
        break;
      case viewList[2]:
        mapView = <MapVisualizationGoogle updateConfig={updateConfig} data={data} settings={config} />;
        break;
      case viewList[3]:
        mapView = (
          <MapVisualizationSchematic schematicMap={schematicMapNewYork} data={data} radius={5} settings={config} />
        );
        break;
      case viewList[4]:
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
  updateConfig: PropTypes.func,
  data: PropTypes.array,
  config: PropTypes.object,
};

export default MapVisualizationContainer;
