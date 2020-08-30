/* eslint-disable camelcase */
import { VISUALIZATIONS_TYPES_TO_CREATE } from '../constants';
import { createInitBarChartConfig, createInitLineChartConfig, createInitTableConfig } from './initConfigsHelper';

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
      newVisualization.config = createInitBarChartConfig(dataSample, schema, getYKeys, getXKeys);
      newVisualization.type = 'BAR_CHART';
      break;
    case 'line-chart':
      newVisualization.config = createInitLineChartConfig(dataSample, schema, getYKeys, getXKeys);
      newVisualization.type = 'LINE_CHART';
      break;
    case 'table':
      newVisualization.config = createInitTableConfig(dataSample, schema, getYKeys, getXKeys);
      newVisualization.type = 'TABLE';
      break;
    default:
      return null;
  }
  return newVisualization;
};
