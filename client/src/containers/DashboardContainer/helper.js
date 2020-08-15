import React from 'react';
import BarChart from '../BarChartContainer/BarChartContainer';
import LineChart from '../LineChartContainer/LineChartContainer';
import TableVisualization from '../TableVisualizationContainer/TableVisualizationContainer';

export const getVisualization = (visualizations, id) => {
  const visualization = visualizations.filter((visualization) => visualization.id === id)[0];
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
