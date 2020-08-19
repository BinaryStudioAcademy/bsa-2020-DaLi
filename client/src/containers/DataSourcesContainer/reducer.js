import {
  IS_DATASETS_LOADING,
  GET_DATASET_ID,
  GET_DATASETS_ERROR,
  GET_DATASETS_SUCCESS,
  GET_TABLES_ERROR,
  GET_TABLES_SUCCESS,
} from './actionTypes';

const initialState = {
  datasets: [],
  currentDatasetId: '',
  tables: [],
  isLoading: false,
  error: null,
  message: '',
  status: '',
};

const datasetsListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DATASETS_ERROR:
    case GET_TABLES_ERROR:
      return {
        ...state,
        error: payload,
        message: payload.message,
        status: 'error',
      };
    case GET_DATASETS_SUCCESS: {
      return {
        ...state,
        datasets: payload,
        isLoading: false,
        status: 'success',
      };
    }
    case GET_DATASET_ID: {
      return {
        ...state,
        currentDatasetId: payload,
      };
    }
    case GET_TABLES_SUCCESS: {
      return {
        ...state,
        tables: payload,
        isLoading: false,
        status: 'success',
      };
    }
    case IS_DATASETS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
};

export default datasetsListReducer;
