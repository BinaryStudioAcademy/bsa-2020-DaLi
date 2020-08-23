/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Snackbar } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import * as actions from './actions';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';

import {
  ViewVisualizationSidebar,
  ViewVisualizationMain,
  ViewVisualizationHeader,
  SaveVisualizationModal,
} from '../../components';
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
    location: { data, schema, tableId },
  } = props;

  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isVisualizationExist, setIsVisualizationExist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    let visualization;
    const isNewVisualization = checkIsVisualizationNew(id);
    if (isNewVisualization) {
      setIsVisualizationExist(false);
      const dataSample = createDataSample(data);
      visualization = createInitVisualization(id, dataSample, userId, schema);
    } else {
      visualization = getVisualization(visualizations, id);
      setIsVisualizationExist(true);
    }
    setVisualization(visualization);
  }, [id, visualizations, userId, setVisualization, data, schema]);

  const visualizationComponent = getVisualizationComponent(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig,
    data
  );

  const visualizationSettings = getVisualizationSettings(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig
  );

  const visualizationIcon = getVisualizationIcon(currentVisualization.type);

  const contentViewComponent = currentView === 'table' ? <InitialTable data={data} /> : visualizationComponent;

  const onSwitchContentView = (viewType) => setCurrentView(viewType);

  const onToggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const displayNotification = () => setIsNotificationVisible(true);

  const hideNotification = () => setIsNotificationVisible(false);

  const createVisualization = ({ name, description }) => {
    updateVisualizationName({ name, description });
    const newVisualization = createNewVisualization(currentVisualization, name, description, tableId);
    visualizationsAPIService.createVisualization(newVisualization);
    closeModal();
    setIsVisualizationExist(true);
    props.history.push('/');
  };

  const updateVisualization = () => {
    const updatedVisualization = createUpdatedVisualization(currentVisualization);
    visualizationsAPIService.updateVisualization(id, updatedVisualization);
    setNotificationMessage('Visualization has been successfully updated');
    displayNotification(true);
  };

  const onVisualizationSave = () => {
    if (isVisualizationExist) {
      updateVisualization();
    } else {
      openModal();
    }
  };

  const onVisualizationNameEdit = () => {
    openModal();
  };

  const editVisualizationName = ({ name, description }) => {
    updateVisualizationName({ name, description });
    closeModal();
  };

  return (
    <>
      <ViewVisualizationHeader
        onVisualizationSave={onVisualizationSave}
        onVisualizationNameEdit={onVisualizationNameEdit}
        isVisualizationExist={isVisualizationExist}
        name={currentVisualization.name}
        description={currentVisualization.description}
        visualizationType={id}
      />
      <Grid container className="view-visualization-container">
        <SaveVisualizationModal
          closeModal={closeModal}
          saveVisualization={isVisualizationExist ? editVisualizationName : createVisualization}
          isVisible={isModalOpen}
          title={isVisualizationExist ? 'Edit visualization name' : 'Save visualization'}
          name={currentVisualization.name}
          description={currentVisualization.description}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isNotificationVisible}
          autoHideDuration={6000}
          onClose={hideNotification}
        >
          <Alert elevation={6} variant="filled" severity="success" onClose={hideNotification}>
            {notificationMessage}
          </Alert>
        </Snackbar>
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
    visualizations: state.analytics.visualizations,
    userId: state.currentUser.user.id,
  };
};

const mapDispatchToProps = {
  ...actions,
};

ViewVisualizationContainer.propTypes = {
  id: PropTypes.string,
  visualizations: PropTypes.array,
  userId: PropTypes.string,
  currentVisualization: PropTypes.object,
  setVisualization: PropTypes.func,
  updateVisualizationConfig: PropTypes.func,
  updateVisualizationName: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.shape({
    data: PropTypes.array,
    schema: PropTypes.array,
    tableId: PropTypes.string,
  }),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewVisualizationContainer));
