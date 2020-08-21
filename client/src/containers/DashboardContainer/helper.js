import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import BarChart from '../BarChartContainer/BarChartContainer';
import LineChart from '../LineChartContainer/LineChartContainer';
import TableVisualization from '../TableVisualizationContainer/TableVisualizationContainer';
// import { dbTableAPIService } from '../../services/api/dbTableAPI.service';

import mockData from '../ViewVisualizationContainer/mockData';

export const getVisualization = (visualizationId, visualizations) => {
  return visualizations.filter((visualization) => visualization.id === visualizationId)[0];
};

export const getParsedVisualization = (visualization) => {
  return { ...visualization, config: JSON.parse(visualization.config) };
};

export const getLayoutItem = (layout, i) => {
  const layoutItem = layout.filter((layoutItem) => layoutItem.i === i)[0];
  return layoutItem;
};

export const getVisualizationComponent = (visualizationType, config, data) => {
  switch (visualizationType) {
    case 'BAR_CHART':
      return <BarChart config={config} data={data} />;
    case 'LINE_CHART':
      return <LineChart config={config} data={data} />;
    case 'TABLE':
      return <TableVisualization config={config} updateConfig={() => {}} data={data} />;
    default:
      return null;
  }
};

export const getDashboardConfig = (dashboard) => (dashboard.config ? JSON.parse(dashboard.config) : null);

export const createUpdatedDashboard = (name, description, layout, layouts) => {
  const updatedDashboard = {
    name,
    description,
    config: JSON.stringify({ layout, layouts }),
  };
  return updatedDashboard;
};

export const getDashboardItems = (dashboardVisualizations, layout, data, onVisualizationDelete) => {
  return dashboardVisualizations.map((dashboardVisualization) => {
    /* async function f() {
      const response = await dbTableAPIService.getTable(dashboardVisualization.tableId);
      return response;
    } */
    // f().then((result) => console.log(result));
    const visualization = getParsedVisualization(dashboardVisualization);
    const layoutItem = getLayoutItem(layout, visualization.id);
    // const result = dbTableAPIService.getTable(dashboardVisualization.tableId);
    // console.log(result);
    const visualizationComponent = getVisualizationComponent(visualization.type, visualization.config, mockData);
    return (
      <div className="dashboard-layout-item" key={visualization.id} data-grid={layoutItem}>
        <div className="dashboard-layout-item__header">
          <h3 className="dashboard-layout-item__title">{visualization.name}</h3>
          <button
            type="button"
            className="dashboard-layout-item__delete"
            onClick={() => onVisualizationDelete(visualization.id)}
          >
            <DeleteIcon className="dashboard-layout-item__delete-icon" />
          </button>
        </div>
        <div className="dashboard-layout-item__visualization">{visualizationComponent}</div>
      </div>
    );
  });
};

export const updateVisualizationsId = (visualizationId, currentVisualizationsId) => {
  return currentVisualizationsId.filter((id) => id !== visualizationId);
};

export const createNewLayoutItem = (visualizationId, currentLayout, cols, breakpoint) => {
  const newLayoutItem = {
    i: visualizationId,
    x: (currentLayout.length * 4) % ((cols && cols[breakpoint]) || 12),
    y: Infinity,
    w: 4,
    h: 3,
    minW: 4,
    minH: 3,
  };
  return newLayoutItem;
};

export const updateLayout = (visualizationId, currentLayout) => {
  return currentLayout.filter((layoutItem) => layoutItem.i !== visualizationId);
};

export const updateDashboardVisualization = (visualizationId, dashboardVisualizations) => {
  return dashboardVisualizations.filter((dashboardVisualization) => dashboardVisualization.id !== visualizationId);
};

export const getDashboardVisualizationsId = (visualizationsId, dashboardVisualizations) => {
  const dashboardVisualizationsId = [];
  visualizationsId.forEach((visualizationId) => {
    const visualization = dashboardVisualizations.filter((visualization) => visualization.id === visualizationId)[0];
    if (!visualization) {
      return;
    }
    const dashboardVisualizationId = visualization.DashboardVisualizations?.id;
    dashboardVisualizationsId.push(dashboardVisualizationId);
  });
  return dashboardVisualizationsId;
};

export const getNewVisualizationsId = (visualizationsId, dashboardVisualizations) => {
  const newVisualizationsId = [];
  visualizationsId.forEach((visualizationId) => {
    const visualization = dashboardVisualizations.filter((visualization) => visualization.id === visualizationId)[0];
    if (!visualization) {
      newVisualizationsId.push(visualizationId);
    }
  });
  return newVisualizationsId;
};

export const getNotAddedVisualizations = (dashboardVisualizations, visualizations) => {
  const dashboardVisualizationsId = dashboardVisualizations.map((dashboardVisualization) => dashboardVisualization.id);
  return visualizations.filter((visualization) => !dashboardVisualizationsId.includes(visualization.id));
};

export const setFullScreen = () => {
  const doc = window.document;
  const docEl = doc.documentElement;
  const requestFullScreen =
    docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  requestFullScreen.call(docEl);
};

export const cancelFullScreen = () => {
  const doc = window.document;
  const cancelFullScreen =
    doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  cancelFullScreen.call(doc);
};
