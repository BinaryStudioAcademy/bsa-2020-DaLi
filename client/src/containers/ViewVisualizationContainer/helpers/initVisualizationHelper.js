import { VISUALIZATIONS_TYPES_TO_CREATE } from '../constants';
import { createInitBarChartConfig, createInitLineChartConfig, createInitTableConfig } from './initConfigsHelper';

export const checkIsVisualizationNew = (id) => VISUALIZATIONS_TYPES_TO_CREATE.includes(id);

export const createDataSample = (data) => data[0];

export const createInitVisualization = (visualizationType, dataSample, userId) => {
  const newVisualization = {
    name: '',
    description: '',
    config: '',
    type: '',
    UserId: userId,
  };
  switch (visualizationType) {
    case 'bar-chart':
      newVisualization.config = createInitBarChartConfig(dataSample);
      newVisualization.type = 'BAR_CHART';
      break;
    case 'line-chart':
      newVisualization.config = createInitLineChartConfig(dataSample);
      newVisualization.type = 'LINE_CHART';
      break;
    case 'table':
      newVisualization.config = createInitTableConfig(dataSample);
      newVisualization.type = 'TABLE';
      break;
    default:
      return null;
  }
  return newVisualization;
};
