import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDashboard, updateDashboard } from './actions';

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
} from './helper';
import mockData from './mockData';

const DashboardContainer = (props) => {
  const { id, currentDashboard, isLoading, getDashboard, visualizations, updateDashboard } = props;

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
  const [isEdit, setIsEdit] = useState(false);
  const [oldName, setOldName] = useState('');
  const [name, setName] = useState(null);
  const [oldDescription, setOldDescription] = useState('');
  const [description, setDescription] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getDashboard(id);
  }, [id, getDashboard]);

  useEffect(() => {
    setName(currentDashboard.name);
    setDescription(currentDashboard.description);
    setDashboardVisualizations(currentDashboard.Visualizations || []);
    const dashboardConfig = getDashboardConfig(currentDashboard);
    setCurrentLayout(dashboardConfig?.layout || []);
    setCurrentLayouts(dashboardConfig?.layouts || []);

    setAddedVisualizationsId([]);
    setDeletedVisualizationsId([]);
  }, [currentDashboard]);

  const onLayoutChange = (layout, layouts) => {
    setCurrentLayout(layout);
    setCurrentLayouts(layouts);
  };

  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  };

  const onSetEdit = () => {
    setOldLayout(currentLayout);
    setOldLayouts(currentLayouts);
    setOldDashboardVisualizations(dashboardVisualizations);
    setOldName(name);
    setOldDescription(description);
    setIsEdit(true);
  };

  const onCancelChanges = () => {
    setCurrentLayout(oldLayout);
    setCurrentLayouts(oldLayouts);
    setDashboardVisualizations(oldDashboardVisualizations);
    setName(oldName);
    setDescription(oldDescription);
    setIsEdit(false);
    setAddedVisualizationsId([]);
    setDeletedVisualizationsId([]);
  };

  const onSaveChanges = () => {
    if (!name.length) {
      return;
    }
    const updatedDashboard = createUpdatedDashboard(name, description, currentLayout, currentLayouts);
    const newVisualizationsId = getNewVisualizationsId(addedVisualizationsId, currentDashboard.Visualizations);
    const deletedDashboardVisualizationsId = getDashboardVisualizationsId(
      deletedVisualizationsId,
      currentDashboard.Visualizations
    );

    updateDashboard({
      dashboardId: id,
      newVisualizationsId,
      deletedDashboardVisualizationsId,
      updatedDashboard,
    });
    setIsEdit(false);
  };

  const onVisualizationAdd = (visualizationId) => {
    const newLayoutItem = createNewLayoutItem(visualizationId, currentLayout, cols, breakpoint);
    const visualization = getVisualization(visualizationId, visualizations);
    const updatedDeletedVisualizationsId = updateVisualizationsId(visualizationId, deletedVisualizationsId);

    setDashboardVisualizations(dashboardVisualizations.concat(visualization));
    setAddedVisualizationsId(addedVisualizationsId.concat(visualizationId));
    setCurrentLayout(currentLayout.concat(newLayoutItem));
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
  return isLoading ? (
    'Loading'
  ) : (
    <>
      <AddVisualizationToDashboardModal
        isVisible={isModalVisible}
        visualizations={visualizations}
        closeModal={onCloseModal}
        search=""
        addVisualization={onVisualizationAdd}
      />
      <DashboardHeader
        name={name}
        description={description}
        isEdit={isEdit}
        onSetEdit={onSetEdit}
        onCancelChanges={onCancelChanges}
        onSaveChanges={onSaveChanges}
        onVisualizationAdd={onOpenModal}
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
      />
      <DashboardLayout
        layout={currentLayout}
        layouts={currentLayouts}
        cols={cols}
        isEdit={isEdit}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        dashboardVisualizations={dashboardVisualizations}
        data={mockData}
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
};

const mapStateToProps = ({ currentDashboard, analytics }) => ({
  currentDashboard: currentDashboard.dashboard,
  isLoading: currentDashboard.isLoading,
  visualizations: analytics.visualizations,
});

const mapDispatchToProps = { getDashboard, updateDashboard };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
