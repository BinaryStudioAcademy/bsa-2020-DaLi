import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import BarChart from '../BarChartContainer/BarChartContainer';
import LineChart from '../LineChartContainer/LineChartContainer';
import TableVisualization from '../TableVisualizationContainer/TableVisualizationContainer';

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

export const getDashboardItems = (dashboardVisualizations, layout, data) => {
  return dashboardVisualizations.map((dashboardVisualization) => {
    const visualization = getParsedVisualization(dashboardVisualization);
    const layoutItem = getLayoutItem(layout, visualization.id);
    const visualizationComponent = getVisualizationComponent(visualization.type, visualization.config, data);
    return (
      <div className="dashboard-layout-item" key={visualization.id} data-grid={layoutItem}>
        <div className="dashboard-layout-item__header">
          <h3 className="dashboard-layout-item__title">{visualization.name}</h3>
          <button type="button" className="dashboard-layout-item__delete">
            <DeleteIcon className="dashboard-layout-item__delete-icon" />
          </button>
        </div>
        <div className="dashboard-layout-item__visualization">{visualizationComponent}</div>
      </div>
    );
  });
};
