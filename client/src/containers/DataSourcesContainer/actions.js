import { GET_DATASETS, GET_TABLES, IS_DATASETS_LOADING, SET_CUREENT_DB_NAME } from './actionTypes';

export const getDatasets = () => {
  return {
    type: GET_DATASETS,
  };
};

export const getTables = (id) => {
  return {
    type: GET_TABLES,
    id,
  };
};

export const setCurrentDbName = (payload) => {
  return {
    type: SET_CUREENT_DB_NAME,
    payload,
  };
};

export const setIsLoading = (payload) => {
  return {
    type: IS_DATASETS_LOADING,
    payload,
  };
};
