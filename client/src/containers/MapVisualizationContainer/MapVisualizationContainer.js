import React from 'react';
import PropTypes from 'prop-types';
import { MapVisualizationGoogle, MapVisualizationSchematic } from '../../components';
import schematicMap from './newYork.json';

const MapVisualizationContainer = ({ data, config }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {config.view === 'google' ? (
        <MapVisualizationGoogle data={data} settings={config} />
      ) : (
        <MapVisualizationSchematic schematicMap={schematicMap} data={data} settings={config} />
      )}
    </div>
  );
};

MapVisualizationContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default MapVisualizationContainer;
