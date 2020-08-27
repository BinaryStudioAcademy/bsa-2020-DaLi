import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getDashboard, updateDashboard, fetchVisualizations } from './actions';

import { DashboardHeader, DashboardLayout, AddVisualizationToDashboardModal } from '../../components';
import {
  getDashboardItems,
  getDashboardConfig,
  createUpdatedDashboard,
  getVisualization,
  updateVisualizationsId,
  createNewLayoutItem,
  updateLayout,
  updateDashboardVisualization,
  getDashboardVisualizationsId,
  getNewVisualizationsId,
  getNotAddedVisualizations,
  setFullScreen,
  cancelFullScreen,
} from './helper';

const DashboardContainer = (props) => {
  const { id, currentDashboard, isLoading, getDashboard, visualizations, updateDashboard, fetchVisualizations } = props;

  const [oldName, setOldName] = useState('');
  const [name, setName] = useState(null);
  const [oldDescription, setOldDescription] = useState('');
  const [description, setDescription] = useState(null);
  const [oldLayout, setOldLayout] = useState([]);
  const [currentLayout, setCurrentLayout] = useState([]);
  const [oldLayouts, setOldLayouts] = useState([]);
  const [currentLayouts, setCurrentLayouts] = useState({});
  const [oldDashboardVisualizations, setOldDashboardVisualizations] = useState([]);
  const [dashboardVisualizations, setDashboardVisualizations] = useState([]);

  const [addedVisualizationsId, setAddedVisualizationsId] = useState([]);
  const [deletedVisualizationsId, setDeletedVisualizationsId] = useState([]);

  const [breakpoint, setBreakpoint] = useState('lg');
  const [cols, setCols] = useState(null);
  const [viewDashboardMode, setViewDashboardMode] = useState('default');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fullScreenListener = () => {
    if (document.fullscreenElement) {
      setViewDashboardMode('full-screen');
    } else {
      setViewDashboardMode('default');
    }
  };

  useEffect(() => {
    if (!visualizations.length) {
      fetchVisualizations();
    }
  }, [visualizations, fetchVisualizations]);

  useEffect(() => {
    getDashboard(id);
  }, [id, getDashboard]);

  useEffect(() => {
    const dashboardConfig = getDashboardConfig(currentDashboard);

    setName(currentDashboard.name);
    setDescription(currentDashboard.description);
    setDashboardVisualizations(currentDashboard.Visualizations || []);
    setCurrentLayout(dashboardConfig?.layout || []);
    setCurrentLayouts(dashboardConfig?.layouts || {});

    setOldName(currentDashboard.name);
    setOldDescription(currentDashboard.description);
    setOldDashboardVisualizations(currentDashboard.Visualizations || []);
    setOldLayout(dashboardConfig?.layout || []);
    setOldLayouts(dashboardConfig?.layouts || {});

    document.addEventListener('fullscreenchange', fullScreenListener);
  }, [currentDashboard]);

  const onLayoutChange = (layout, layouts) => {
    setCurrentLayout(layout);
    setCurrentLayouts(layouts);
  };

  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  };

  const discardChanges = () => {
    setCurrentLayout(oldLayout);
    setCurrentLayouts(oldLayouts);
    setDashboardVisualizations(oldDashboardVisualizations);
    setName(oldName);
    setDescription(oldDescription);
    setAddedVisualizationsId([]);
    setDeletedVisualizationsId([]);
  };

  const onSetEdit = () => {
    setViewDashboardMode('edit');
  };

  const onCancelChanges = () => {
    discardChanges();
    setViewDashboardMode('default');
  };

  const onSaveChanges = () => {
    if (!name.length) {
      return;
    }
    const updatedDashboardData = createUpdatedDashboard(name, description, currentLayout, currentLayouts);
    const newVisualizationsId = getNewVisualizationsId(addedVisualizationsId, currentDashboard.Visualizations);
    const deletedDashboardVisualizationsId = getDashboardVisualizationsId(
      deletedVisualizationsId,
      currentDashboard.Visualizations
    );

    updateDashboard({
      dashboardId: id,
      newVisualizationsId,
      deletedDashboardVisualizationsId,
      updatedDashboardData,
    });

    setViewDashboardMode('default');
    discardChanges();
  };

  const onVisualizationAdd = (visualizationId, newVisualizationData) => {
    const newLayoutItem = createNewLayoutItem(visualizationId, currentLayout, cols, breakpoint);
    setCurrentLayout(currentLayout.concat(newLayoutItem));
    const visualization = getVisualization(visualizationId, visualizations);
    const updatedDeletedVisualizationsId = updateVisualizationsId(visualizationId, deletedVisualizationsId);
    visualization.data = newVisualizationData;
    setDashboardVisualizations(dashboardVisualizations.concat(visualization));
    setAddedVisualizationsId(addedVisualizationsId.concat(visualizationId));
    setDeletedVisualizationsId(updatedDeletedVisualizationsId);
  };

  const onVisualizationDelete = (visualizationId) => {
    const updatedLayout = updateLayout(visualizationId, currentLayout);
    const updatedAddedVisualizationsId = updateVisualizationsId(visualizationId, addedVisualizationsId);
    const updatedDashboardVisualizations = updateDashboardVisualization(visualizationId, dashboardVisualizations);

    setDashboardVisualizations(updatedDashboardVisualizations);
    setAddedVisualizationsId(updatedAddedVisualizationsId);
    setDeletedVisualizationsId(deletedVisualizationsId.concat(visualizationId));
    setCurrentLayout(currentLayout.concat(updatedLayout));
  };

  const onOpenModal = () => {
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSetFullScreenViewMode = () => {
    discardChanges();
    setFullScreen();
    setViewDashboardMode('full-screen');
  };

  const onSetDefaultViewMode = () => {
    cancelFullScreen();
    setViewDashboardMode('default');
  };

  return isLoading ? (
    <div style={{ position: 'relative' }}>
      <CircularProgress size={40} left={-20} top={10} style={{ marginLeft: '50%' }} />
    </div>
  ) : (
    <>
      <AddVisualizationToDashboardModal
        isVisible={isModalVisible}
        visualizations={getNotAddedVisualizations(dashboardVisualizations, visualizations)}
        closeModal={onCloseModal}
        addVisualization={onVisualizationAdd}
      />
      <DashboardHeader
        name={name}
        description={description}
        viewDashboardMode={viewDashboardMode}
        onSetEdit={onSetEdit}
        onCancelChanges={onCancelChanges}
        onSaveChanges={onSaveChanges}
        onVisualizationAdd={onOpenModal}
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
        onSetFullScreenViewMode={onSetFullScreenViewMode}
        onSetDefaultViewMode={onSetDefaultViewMode}
      />
      <DashboardLayout
        layout={currentLayout}
        layouts={currentLayouts}
        cols={cols}
        viewDashboardMode={viewDashboardMode}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        dashboardVisualizations={dashboardVisualizations}
        getDashboardItems={getDashboardItems}
        onVisualizationDelete={onVisualizationDelete}
      />
    </>
  );
};

DashboardContainer.propTypes = {
  id: PropTypes.string,
  currentDashboard: PropTypes.object,
  visualizations: PropTypes.array,
  isLoading: PropTypes.bool,
  getDashboard: PropTypes.func,
  updateDashboard: PropTypes.func,
  fetchVisualizations: PropTypes.func,
};

const mapStateToProps = ({ currentDashboard, analytics }) => ({
  currentDashboard: currentDashboard.dashboard,
  isLoading: currentDashboard.isLoading,
  visualizations: analytics.visualizations,
});

const mapDispatchToProps = { getDashboard, updateDashboard, fetchVisualizations };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
