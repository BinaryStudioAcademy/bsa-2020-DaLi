import {
  SET_VISUALIZATION,
  UPDATE_VISUALIZATION_CONFIG,
  UPDATE_VISUALIZATION_NAME,
  FETCH_VISUALIZATION,
  FETCH_DATA_AND_SCHEMA,
} from './actionTypes';

export const setVisualization = (visualization) => {
  return {
    type: SET_VISUALIZATION,
    payload: { visualization },
  };
};

export const fetchVisualization = (id) => {
  return {
    type: FETCH_VISUALIZATION,
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

export const fetchDataAndSchema = (tableId) => {
  return {
    type: FETCH_DATA_AND_SCHEMA,
    tableId,
  };
};
