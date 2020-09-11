import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import './ViewVisualizationSidebar.css';

const ViewVisualizationSidebar = ({ components, sideBarPage }) => {
  return (
    <Grid item className="view-visualization-sidebar">
      {components[sideBarPage]}
    </Grid>
  );
};

ViewVisualizationSidebar.propTypes = {
  components: PropTypes.array,
  sideBarPage: PropTypes.number,
};

export default ViewVisualizationSidebar;
