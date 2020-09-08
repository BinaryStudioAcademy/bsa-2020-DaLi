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
    currentVisualization,
    userId,
    setVisualization,
    updateVisualizationConfig,
    updateVisualizationName,
    location: { prevPath },
    fetchVisualization,
    fetchDataAndSchema,
    data,
    schema,
    updateVisualizationData,
    tableId,
    visualizationType,
  } = props;

  const [currentView, setCurrentView] = useState('table');
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(false);
  const [isRightSideBarOpen, setIsRightSideBarOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [leftSideBarPage, setLeftSideBarPage] = useState(0);
  const [rightSideBarPage, setRightSideBarPage] = useState(0);
  const [notificationType, setNotificationType] = useState('success');
  const [datasetSettings, setDatasetSettings] = useState([]);
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
  }, [visualizationType]);

  useEffect(() => {
    setDatasetSettings(currentVisualization.datasetSettings);
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
        <InitialTable data={data} config={currentVisualization.config} schema={schema} />
      ) : (
        visualizationComponent
      )
    ) : null;

  const onSwitchContentView = (viewType) => setCurrentView(viewType);

  const onToggleLeftSideBar = (newLeftSideBarPage) => {
    if (newLeftSideBarPage !== leftSideBarPage && isLeftSideBarOpen) {
      setLeftSideBarPage(newLeftSideBarPage);
    } else if (newLeftSideBarPage === leftSideBarPage && isLeftSideBarOpen) {
      setIsLeftSideBarOpen(false);
    } else {
      setIsLeftSideBarOpen(true);
      setLeftSideBarPage(newLeftSideBarPage);
    }
  };

  const onToggleRightSideBar = (newRightSideBarPage) => () => {
    // console.log(newRightSideBarPage, rightSideBarPage, isRightSideBarOpen);
    if (newRightSideBarPage !== rightSideBarPage && isRightSideBarOpen) {
      // console.log('111111');
      setRightSideBarPage(newRightSideBarPage);
    } else if (newRightSideBarPage === rightSideBarPage && isRightSideBarOpen) {
      // console.log('222222');
      setIsRightSideBarOpen(false);
    } else {
      // console.log('333333');
      setIsRightSideBarOpen(true);
      setRightSideBarPage(newRightSideBarPage);
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
    props.history.push('/');
  };

  const updateVisualization = (newConfig, newDatasetSettings) => {
    const updatedVisualization = createUpdatedVisualization(currentVisualization, newConfig, newDatasetSettings);
    updateVisualizationData(visualizationId, updatedVisualization);
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

  return !currentVisualization.created || !schema || !data ? (
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
        onToggleRightSideBar={onToggleRightSideBar}
        tableId={tableId}
        visualizationType={visualizationType}
        updateVisualization={updateVisualization}
        datasetSettings={datasetSettings}
        rightSideBarPage={rightSideBarPage}
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
        {isLeftSideBarOpen && (
          <ViewVisualizationSidebar
            components={[visualizationSettings, selectVisualizationSidebar]}
            sideBarPage={leftSideBarPage}
          />
        )}
        <ViewVisualizationMain
          contentViewComponent={contentViewComponent}
          currentContentView={currentView}
          visualizationIcon={visualizationIcon}
          onToggleSideBar={onToggleLeftSideBar}
          onSwitchContentView={onSwitchContentView}
          isVisualizationExist={isVisualizationExist}
        />
        {isRightSideBarOpen && (
          <ViewVisualizationSidebar
            components={[
              <FilterBar
                currentVisualization={currentVisualization}
                closeSidebar={() => setIsRightSideBarOpen(false)}
                updateVisualization={updateVisualization}
              />,
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
  updateVisualizationData: PropTypes.func,
  tableId: PropTypes.string,
  visualizationType: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewVisualizationContainer));
