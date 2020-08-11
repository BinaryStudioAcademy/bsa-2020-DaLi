import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { ViewVisualizationSidebar, ViewVisualizationMain } from '../../components';
import InitialTable from '../InitialTableContainer/InitialTableContainer';

import * as actions from './actions';

/* import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service'; */

import {
  getVisualizationComponent,
  getVisualizationIcon,
  getVisualizationSettings,
  getVisualization,
  checkIsVisualizationNew,
  createNewVisualization,
} from './helper';

import mockData from './mockData';

import './ViewVisualizationContainer.css';

const ViewVisualizationContainer = (props) => {
  const { id, visualizations, currentVisualization, setVisualization, updateVisualizationConfig } = props;

  useEffect(() => {
    const isNewVisualization = checkIsVisualizationNew(id);
    const visualization = isNewVisualization
      ? createNewVisualization(id, mockData[0])
      : getVisualization(visualizations, id);
    setVisualization(visualization);
  }, [id]);

  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const visualizationComponent = getVisualizationComponent(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig,
    mockData
  );
  const visualizationIcon = getVisualizationIcon(currentVisualization.type);

  const visualizationSettings = getVisualizationSettings(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig
  );

  const contentViewComponent = currentView === 'table' ? <InitialTable data={mockData} /> : visualizationComponent;

  const onSwitchContentView = (viewType) => setCurrentView(viewType);
  const onToggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const onVisualizationSave = () => {
    /* visualizationsAPIService.patchData(`/api/visualizations/${id}`, currentVisualization); */
    // eslint-disable-next-line no-console
    console.log(currentVisualization);
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
