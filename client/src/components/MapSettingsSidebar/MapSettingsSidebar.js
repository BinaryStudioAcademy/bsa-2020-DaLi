import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const MapSettingsSidebar = () => {
  return (
    <div className="table-settings-sidebar-container">
      <h3>Map</h3>
    </div>
  );
};

MapSettingsSidebar.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
};

export default MapSettingsSidebar;
