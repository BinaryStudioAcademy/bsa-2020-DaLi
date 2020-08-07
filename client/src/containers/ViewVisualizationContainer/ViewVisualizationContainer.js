import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { ViewVisualizationSidebar, ViewVisualizationMain } from '../../components';

import { getVisualizationComponent, getVisualizationIcon } from './helper';

import './ViewVisualizationContainer.css';

const ViewVisualizationContainer = ({ visualizationType }) => {
  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const visualizationComponent = getVisualizationComponent(visualizationType);
  const visualizationIcon = getVisualizationIcon(visualizationType);
  const contentViewComponent = currentView === 'table' ? <div>Table</div> : visualizationComponent;

  const onSwitchContentView = (viewType) => setCurrentView(viewType);
  const onToggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  return (
    <Grid container className="view-visualization-container">
      {isSideBarOpen && <ViewVisualizationSidebar />}
      <ViewVisualizationMain
        contentViewComponent={contentViewComponent}
        currentContentView={currentView}
        visualizationIcon={visualizationIcon}
        onToggleSideBar={onToggleSideBar}
        onSwitchContentView={onSwitchContentView}
      />
    </Grid>
  );
};

ViewVisualizationContainer.propTypes = {
  visualizationType: PropTypes.string,
};

export default ViewVisualizationContainer;
