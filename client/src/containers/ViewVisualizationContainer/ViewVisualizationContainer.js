/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import * as actions from './actions';

import { ViewVisualizationSidebar, ViewVisualizationMain } from '../../components';
import InitialTable from '../InitialTableContainer/InitialTableContainer';

import {
  getVisualization,
  getVisualizationComponent,
  getVisualizationSettings,
  getVisualizationIcon,
  checkIsVisualizationNew,
  createDataSample,
  createNewVisualization,
} from './helpers';

import mockData from './mockData';

import './ViewVisualizationContainer.css';

const ViewVisualizationContainer = (props) => {
  const { id, visualizations, currentVisualization, setVisualization, updateVisualizationConfig } = props;

  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isVisualizationExist, setIsVisualizationExist] = useState(true);

  useEffect(() => {
    let visualization;
    const isNewVisualization = checkIsVisualizationNew(id);
    if (isNewVisualization) {
      setIsVisualizationExist(false);
      const dataSample = createDataSample(mockData);
      visualization = createNewVisualization(id, dataSample);
    } else {
      visualization = getVisualization(visualizations, id);
    }
    setVisualization(visualization);
  }, []);

  const visualizationComponent = getVisualizationComponent(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig,
    mockData
  );

  const visualizationSettings = getVisualizationSettings(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig
  );

  const visualizationIcon = getVisualizationIcon(currentVisualization.type);

  const contentViewComponent = currentView === 'table' ? <InitialTable data={mockData} /> : visualizationComponent;

  const onSwitchContentView = (viewType) => setCurrentView(viewType);

  const onToggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const onVisualizationSave = () => {
    if (isVisualizationExist) {
      console.log(currentVisualization);
      console.log('Visualization is updated');
    } else {
      console.log(currentVisualization);
      console.log('Visualization is created');
    }
  };

  return (
    <>
      <div className="view-visualization-header">
        <Button
          className="view-visualization-button"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onVisualizationSave}
        >
          Save
        </Button>
      </div>
      <Grid container className="view-visualization-container">
        {isSideBarOpen && <ViewVisualizationSidebar component={visualizationSettings} />}
        <ViewVisualizationMain
          contentViewComponent={contentViewComponent}
          currentContentView={currentView}
          visualizationIcon={visualizationIcon}
          onToggleSideBar={onToggleSideBar}
          onSwitchContentView={onSwitchContentView}
        />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentVisualization: state.currentVisualization,
    visualizations: state.visualizations.visualizations,
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
