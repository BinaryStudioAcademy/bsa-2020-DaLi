import {
  GET_VISUALISATIONS_SUCCESS,
  GET_VISUALISATIONS_ERROR,
  DELETE_VISUALISATIONS_SUCCESS,
  DELETE_VISUALISATIONS_ERROR,
  IS_LOADING,
  RESET_ERROR,
} from './actionsTypes';

const initialState = {
  visualizations: [
    { id: 1, name: 'First visualization', type: 'LINE_CHART', description: '' },
    { id: 2, name: 'Second visualization', type: 'BAR_CHART', description: '' },
    { id: 3, name: 'It is the best my visualization', type: 'TABLE', description: '' },
    { id: 4, name: 'Other visualization', type: 'TABLE', description: '' },
    { id: 5, name: 'Last visualization', type: 'BAR_CHART', description: '' },
  ],
  isLoading: false,
  error: null,
};

const visualizationsListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VISUALISATIONS_SUCCESS: {
      return {
        ...state,
        visualizations: [...payload.visualizations],
      };
    }
    case GET_VISUALISATIONS_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    case DELETE_VISUALISATIONS_SUCCESS: {
      return {
        ...state,
        visualizations: [...payload.visualizations],
      };
    }
    case DELETE_VISUALISATIONS_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
};

export default visualizationsListReducer;
