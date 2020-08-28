import { VISUALIZATIONS_TYPES_TO_CREATE } from '../constants';
import { createInitBarChartConfig, createInitLineChartConfig, createInitTableConfig } from './initConfigsHelper';

export const checkIsVisualizationNew = (id) => VISUALIZATIONS_TYPES_TO_CREATE.includes(id);

export const createDataSample = (data) => data[0];

export const getYKeys = (schema) => {
  const mongoDbAvailableTypes = ['int', 'double', 'long'];
  const postgresAvailableTypes = [
    'smallint',
    'integer',
    'bigint',
    'decimal',
    'numeric',
    'real',
    'double precision',
    'smallserial',
    'serial',
    'bigserial',
  ];
  const mySQLAvailableTypes = [
    'TINYINT',
    'SMALLINT',
    'MEDIUMINT',
    'INT',
    'BIGINT',
    'DECIMAL',
    'FLOAT',
    'DOUBLE',
    'BIT',
  ];
  const allAvailableTypes = [...mongoDbAvailableTypes, ...postgresAvailableTypes, ...mySQLAvailableTypes];
  const columnsOfNumericType = schema.filter((obj) => {
    return allAvailableTypes.includes(obj.data_type);
  });

  return columnsOfNumericType.map((obj) => obj.column_name);
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
    default:
      return null;
  }
  return newVisualization;
};
