import { GET_DATASETS, GET_TABLES, IS_DATASETS_LOADING, GET_DATASET_ID } from './actionTypes';

export const getDatasets = () => {
  return {
    type: GET_DATASETS,
  };
};

export const getDatasetId = (payload) => {
  return {
    type: GET_DATASET_ID,
    payload,
  };
};

export const getTables = (id) => {
  return {
    type: GET_TABLES,
    id,
  };
};

export const setIsLoading = (payload) => {
  return {
    type: IS_DATASETS_LOADING,
    payload,
  };
};
