/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import * as actions from './actions';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';

import { ViewVisualizationSidebar, ViewVisualizationMain, SaveVisualizationModal } from '../../components';
import InitialTable from '../InitialTableContainer/InitialTableContainer';

import {
  getVisualization,
  getVisualizationComponent,
  getVisualizationSettings,
  getVisualizationIcon,
  checkIsVisualizationNew,
  createDataSample,
  createInitVisualization,
  createNewVisualization,
  createUpdatedVisualization,
} from './helpers';

import mockData from './mockData';

import './ViewVisualizationContainer.css';

const ViewVisualizationContainer = (props) => {
  const {
    id,
    visualizations,
    userId,
    currentVisualization,
    setVisualization,
    updateVisualizationConfig,
    updateVisualizationName,
  } = props;

  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isVisualizationExist, setIsVisualizationExist] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let visualization;
    const isNewVisualization = checkIsVisualizationNew(id);
    if (isNewVisualization) {
      setIsVisualizationExist(false);
      const dataSample = createDataSample(mockData);
      visualization = createInitVisualization(id, dataSample, userId);
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

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const createVisualization = ({ name, description }) => {
    updateVisualizationName({ name, description });
    const newVisualization = createNewVisualization(currentVisualization, name, description);
    visualizationsAPIService.createVisualization(newVisualization);
    closeModal();
  };

  const updateVisualization = () => {
    const updatedVisualization = createUpdatedVisualization(currentVisualization);
    visualizationsAPIService.updateVisualization(id, updatedVisualization);
  };

  const onVisualizationSave = () => {
    if (isVisualizationExist) {
      updateVisualization();
    } else {
      openModal();
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
        <SaveVisualizationModal
          closeModal={closeModal}
          saveVisualization={createVisualization}
          isVisible={isModalOpen}
        />
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
    userId: state.currentUser.user.id,
  };
};

const mapDispatchToProps = {
  ...actions,
};

ViewVisualizationContainer.propTypes = {
  id: PropTypes.string,
  visualizations: PropTypes.array,
  userId: PropTypes.array,
  currentVisualization: PropTypes.object,
  setVisualization: PropTypes.func,
  updateVisualizationConfig: PropTypes.func,
  updateVisualizationName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewVisualizationContainer);
