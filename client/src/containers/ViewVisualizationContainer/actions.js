import {
  SET_VISUALIZATION,
  UPDATE_VISUALIZATION_CONFIG,
  UPDATE_VISUALIZATION_NAME,
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA,
  FETCH_DATA_AND_SCHEMA,
  UPDATE_VISUALIZATION,
  RESET_NOTIFICATION,
} from './actionTypes';

export const setVisualization = (visualization) => {
  return {
    type: SET_VISUALIZATION,
    payload: { visualization },
  };
};

export const fetchVisualization = (id) => {
  return {
    type: FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA,
    id,
  };
};

export const updateVisualizationConfig = (updateConfig) => {
  return {
    type: UPDATE_VISUALIZATION_CONFIG,
    payload: { updateConfig },
  };
};

export const updateVisualizationName = ({ name, description }) => {
  return {
    type: UPDATE_VISUALIZATION_NAME,
    payload: { name, description },
  };
};

export const fetchDataAndSchema = (tableId, settings = []) => {
  return {
    type: FETCH_DATA_AND_SCHEMA,
    tableId,
    settings,
  };
};

export const updateVisualizationData = (visualizationId, updatedVisualization) => {
  return {
    type: UPDATE_VISUALIZATION,
    visualizationId,
    updatedVisualization,
  };
};

export const resetNotification = () => {
  return {
    type: RESET_NOTIFICATION,
  };
};
