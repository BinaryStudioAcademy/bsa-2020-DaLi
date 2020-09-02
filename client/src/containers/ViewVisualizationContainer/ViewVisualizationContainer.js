/* eslint-disable react-hooks/exhaustive-deps */
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
  FilterBar,
  SummarizeBar,
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
    visualizationId,
    visualizations,
    userId,
    currentVisualization,
    setVisualization,
    updateVisualizationConfig,
    updateVisualizationName,
    location: { prevPath },
    fetchVisualization,
    fetchDataAndSchema,
    data,
    schema,
    tableId,
    visualizationType,
  } = props;

  const [currentView, setCurrentView] = useState('table');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [rightSideBarType, setRightSideBarType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sideBarPage, setSideBarPage] = useState(0);
  const [notificationType, setNotificationType] = useState('success');
  const [isVisualizationExist] = useState(() => {
    return !!visualizationId;
  });

  const userNotificationError = (notification) => {
    setIsNotificationVisible(true);
    setNotificationMessage(notification);
    setNotificationType('error');
  };

  const isNewVisualization = checkIsVisualizationNew(visualizationType);
  const isSameData = checkIsVisualizationTypeChangedDuringCreation(prevPath, tableId);

  useEffect(() => {
    if (isNewVisualization && tableId && !isSameData) {
      fetchDataAndSchema(tableId);
    }
    if (!isNewVisualization) {
      fetchVisualization(visualizationId);
    }
  }, [visualizationId, visualizations, userId, visualizationType]);

  // useEffect(() => {
  //   console.log('start');
  //   console.log(currentVisualization);
  //   console.log('finish');
  // }, [currentVisualization.datasetSettings]);

  useEffect(() => {
    if (isNewVisualization && 'data' in currentVisualization && (!currentVisualization.created || isSameData)) {
      const visualization = createInitVisualization(visualizationType, userId, schema);
      setVisualization(visualization);
    }
  }, [data, visualizationType]);

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

  const contentViewComponent =
    // eslint-disable-next-line no-nested-ternary
    schema && data ? (
      currentView === 'table' ? (
        <InitialTable schema={schema} data={data} />
      ) : (
        visualizationComponent
      )
    ) : null;

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

  const onToggleRightSideBar = (type) => () => {
    if (rightSideBarType === type) {
      setIsRightSideBarOpen(false);
      setRightSideBarType('');
    } else {
      setRightSideBarType(type);
      setIsRightSideBarOpen(true);
    }
  };

  const selectComponentForRightSidebar = getRightSidebarComponent(rightSideBarType, currentVisualization);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const displayNotification = () => setIsNotificationVisible(true);

  const hideNotification = () => setIsNotificationVisible(false);

  const createVisualization = ({ name, description }) => {
    updateVisualizationName({ name, description });
    const newVisualization = createNewVisualization(
      currentVisualization,
      name,
      description,
      currentVisualization.tableId
    );
    visualizationsAPIService.createVisualization(newVisualization);
    closeModal();
    props.history.push('/');
  };

  const updateVisualization = (newConfig) => {
    const updatedVisualization = createUpdatedVisualization(currentVisualization, newConfig);
    visualizationsAPIService.updateVisualization(visualizationId, updatedVisualization);
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

  return !currentVisualization.created ? (
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
        tableId={tableId}
        visualizationType={visualizationType}
        onToggleRightSideBar={onToggleRightSideBar}
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
        {isRightSideBarOpen && (
          <ViewVisualizationSidebar
            components={[
              <FilterBar currentVisualization={currentVisualization} />,
              <SummarizeBar currentVisualization={currentVisualization} updateVisualization={updateVisualization} />,
            ]}
            sideBarPage={rightSideBarPage}
          />
        )}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentVisualization: state.currentVisualization,
    // visualizations: state.analytics.visualizations,
    userId: state.currentUser.user.id,
    data: state.currentVisualization.data,
    schema: state.currentVisualization.schema,
  };
};

const mapDispatchToProps = {
  ...actions,
};

ViewVisualizationContainer.propTypes = {
  visualizationId: PropTypes.string,
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
    prevPath: PropTypes.string,
  }),
  tableId: PropTypes.string,
  visualizationType: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewVisualizationContainer));
