/* eslint-disable camelcase */
import { VISUALIZATIONS_TYPES_TO_CREATE } from '../constants';
import {
  createInitBarChartConfig,
  createInitLineChartConfig,
  createInitTableConfig,
  createInitMapConfig,
} from './initConfigsHelper';

export const checkIsVisualizationNew = (id) => VISUALIZATIONS_TYPES_TO_CREATE.includes(id);

export const checkIsVisualizationTypeChangedDuringCreation = (prevPath) => {
  if (typeof prevPath === 'string') {
    return VISUALIZATIONS_TYPES_TO_CREATE.includes(prevPath.slice(22));
  }
  return false;
};

export const createDataSample = (data) => data[0];

export const getYKeys = (schema) => {
  const availableKeys = schema.filter(({ data_type }) => {
    const isNum = data_type === 'number';
    const isBool = data_type === 'boolean';
    return isNum || isBool;
  });

  return availableKeys.map((obj) => obj.column_name);
};

export const getXKeys = (schema) => {
  const availableKeys = schema.filter(({ data_type }) => {
    const isNum = data_type === 'number';
    const isBool = data_type === 'boolean';
    const isStr = data_type === 'string';
    const isDate = data_type === 'date';
    return isNum || isBool || isStr || isDate;
  });

  return availableKeys.map((obj) => obj.column_name);
};

export const createInitVisualization = (visualizationType, userId, schema, tableId) => {
  const newVisualization = {
    name: '',
    description: '',
    config: '',
    type: '',
    UserId: userId,
    tableId,
    datasetSettings: [],
  };
  switch (visualizationType) {
    case 'bar-chart':
      newVisualization.config = createInitBarChartConfig(schema, getYKeys, getXKeys);
      newVisualization.type = 'BAR_CHART';
      break;
    case 'line-chart':
      newVisualization.config = createInitLineChartConfig(schema, getYKeys, getXKeys);
      newVisualization.type = 'LINE_CHART';
      break;
    case 'table':
      newVisualization.config = createInitTableConfig(schema);
      newVisualization.type = 'TABLE';
      break;
    case 'map':
      newVisualization.config = createInitMapConfig(schema);
      newVisualization.type = 'MAP';
      break;
    default:
      return null;
  }
  return newVisualization;
};
