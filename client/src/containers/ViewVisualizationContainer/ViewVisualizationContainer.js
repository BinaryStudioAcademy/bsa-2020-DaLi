/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Snackbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  getVisualizationComponent,
  getVisualizationSettings,
  getVisualizationIcon,
  getSelectVisualizationSidebar,
  checkIsVisualizationNew,
  createInitVisualization,
  createNewVisualization,
  createUpdatedVisualization,
  checkIsVisualizationTypeChangedDuringCreation,
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
    location: { tableId, prevPath },
    fetchVisualization,
    fetchDataAndSchema,
    data,
    schema,
  } = props;

  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isVisualizationExist, setIsVisualizationExist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sideBarPage, setSideBarPage] = useState(0);
  const [notificationType, setNotificationType] = useState('success');

  const userNotificationError = (notification) => {
    setIsNotificationVisible(true);
    setNotificationMessage(notification);
    setNotificationType('error');
  };

  useEffect(() => {
    const isRedirectedFromNewVisualization = checkIsVisualizationTypeChangedDuringCreation(prevPath);
    const isNewVisualization = checkIsVisualizationNew(id);
    if (!tableId && isNewVisualization) {
      props.history.push('/data-sources');
    }
    if (isNewVisualization && isRedirectedFromNewVisualization) {
      const visualization = createInitVisualization(id, userId, schema);
      setVisualization(visualization);
    } else if (isNewVisualization) {
      fetchDataAndSchema(tableId);
    }
    if (!isNewVisualization) {
      fetchVisualization(id);
      setIsVisualizationExist(true);
    }
  }, [id, visualizations, userId, setVisualization, fetchVisualization]);

  useEffect(() => {
    if ('data' in currentVisualization) {
      if (currentVisualization.created !== true) {
        setIsVisualizationExist(false);
        const visualization = createInitVisualization(id, userId, schema);
        setVisualization(visualization);
      }
    }
  }, [data]);

  const visualizationComponent = getVisualizationComponent(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig,
    data
  );

  const visualizationSettings = getVisualizationSettings(
    currentVisualization.type,
    currentVisualization.config,
    updateVisualizationConfig,
    userNotificationError
  );
  const visualizationIcon = getVisualizationIcon(currentVisualization.type);

  const contentViewComponent = currentView === 'table' ? <InitialTable data={data} /> : visualizationComponent;

  const onSwitchContentView = (viewType) => setCurrentView(viewType);

  const onToggleSideBar = (newSideBarPage) => {
    if (newSideBarPage !== sideBarPage && isSideBarOpen) {
      setSideBarPage(newSideBarPage);
    } else if (newSideBarPage === sideBarPage && isSideBarOpen) {
      setIsSideBarOpen(false);
    } else {
      setIsSideBarOpen(true);
      setSideBarPage(newSideBarPage);
    }
  };

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
    setNotificationType('success');
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

  const selectVisualizationSidebar = getSelectVisualizationSidebar(tableId);

  return currentVisualization.loading ? (
    <div style={{ position: 'relative' }}>
      <CircularProgress size={40} left={-20} top={10} style={{ marginLeft: '50%' }} />
    </div>
  ) : (
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
          <Alert elevation={6} variant="filled" severity={notificationType} onClose={hideNotification}>
            {notificationMessage}
          </Alert>
        </Snackbar>
        {isSideBarOpen && (
          <ViewVisualizationSidebar
            components={[visualizationSettings, selectVisualizationSidebar]}
            sideBarPage={sideBarPage}
          />
        )}
        <ViewVisualizationMain
          contentViewComponent={contentViewComponent}
          currentContentView={currentView}
          visualizationIcon={visualizationIcon}
          onToggleSideBar={onToggleSideBar}
          onSwitchContentView={onSwitchContentView}
          isVisualizationExist={isVisualizationExist}
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
    data: state.currentVisualization.data,
    schema: state.currentVisualization.schema,
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
  fetchVisualization: PropTypes.func,
  updateVisualizationConfig: PropTypes.func,
  updateVisualizationName: PropTypes.func,
  fetchDataAndSchema: PropTypes.func,
  data: PropTypes.array,
  schema: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.shape({
    tableId: PropTypes.string,
    prevPath: PropTypes.string,
  }),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewVisualizationContainer));
