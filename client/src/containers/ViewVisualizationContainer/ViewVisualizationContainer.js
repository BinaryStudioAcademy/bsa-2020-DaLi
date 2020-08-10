import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import * as actions from './actions';
import { ViewVisualizationSidebar, ViewVisualizationMain } from '../../components';
import InitialTable from '../InitialTableContainer/InitialTableContainer';

import { getVisualizationComponent, getVisualizationIcon, getVisualization } from './helper';

import './ViewVisualizationContainer.css';

const ViewVisualizationContainer = (props) => {
  const { id, visualizations, currentVisualization, setVisualization, updateVisualizationConfig } = props;

  useEffect(() => {
    const visualization = getVisualization(visualizations, id);
    setVisualization(visualization);
  }, []);

  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const visualizationComponent = getVisualizationComponent(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig
  );
  const visualizationIcon = getVisualizationIcon(currentVisualization.type);
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

ViewVisualizationContainer.propTypes = {
  id: PropTypes.string,
  visualizations: PropTypes.array,
  currentVisualization: PropTypes.object,
  setVisualization: PropTypes.func,
  updateVisualizationConfig: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewVisualizationContainer);
