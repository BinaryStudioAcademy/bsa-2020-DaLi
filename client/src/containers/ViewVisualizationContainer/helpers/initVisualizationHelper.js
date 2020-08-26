import { VISUALIZATIONS_TYPES_TO_CREATE } from '../constants';
import { createInitBarChartConfig, createInitLineChartConfig, createInitTableConfig } from './initConfigsHelper';

export const checkIsVisualizationNew = (id) => VISUALIZATIONS_TYPES_TO_CREATE.includes(id);

export const createDataSample = (data) => data[0];

export const getYKeys = (schema) => {
  const columnsOfTypeInt = schema.filter((obj) => {
    return obj.data_type === 'integer';
  });

  return columnsOfTypeInt.map((obj) => obj.column_name);
};

export const createInitVisualization = (visualizationType, dataSample, userId, schema) => {
  const newVisualization = {
    name: '',
    description: '',
    config: '',
    type: '',
    UserId: userId,
  };
  switch (visualizationType) {
    case 'bar-chart':
      newVisualization.config = createInitBarChartConfig(dataSample, schema, getYKeys);
      newVisualization.type = 'BAR_CHART';
      break;
    case 'line-chart':
      newVisualization.config = createInitLineChartConfig(dataSample, schema, getYKeys);
      newVisualization.type = 'LINE_CHART';
      break;
    case 'table':
      newVisualization.config = createInitTableConfig(dataSample, schema, getYKeys);
      newVisualization.type = 'TABLE';
      break;
    case 'map':
      newVisualization.config = createInitTableConfig(dataSample, schema, getYKeys);
      newVisualization.type = 'MAP';
      break;
    default:
      return null;
  }
  return newVisualization;
};
