import React, { useState } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import * as actions from './actions';
import { ViewVisualizationSidebar, ViewVisualizationMain } from '../../components';
import InitialTable from '../InitialTableContainer/InitialTableContainer';

import { getVisualizationComponent, getVisualizationIcon } from './helper';

import './ViewVisualizationContainer.css';

const ViewVisualizationContainer = () => {
  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const visualizationComponent = getVisualizationComponent('BAR_CHART');
  const visualizationIcon = getVisualizationIcon('BAR_CHART');
  const contentViewComponent = currentView === 'table' ? <InitialTable /> : visualizationComponent;

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

const mapStateToProps = (state) => {
  return {
    currentVisualization: state.currentVisualization,
    visualizations: state.visualizations,
  };
};

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewVisualizationContainer);
