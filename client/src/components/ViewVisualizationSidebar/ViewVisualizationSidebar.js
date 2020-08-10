import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import './ViewVisualizationSidebar.css';

const ViewVisualizationSidebar = ({ component }) => {
  return (
    <Grid item className="view-visualization-sidebar">
      {component}
    </Grid>
  );
};

ViewVisualizationSidebar.propTypes = {
  component: PropTypes.func,
};

export default ViewVisualizationSidebar;
