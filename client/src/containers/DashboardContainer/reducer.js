import { GET_DASHBOARD, GET_DASHBOARD_ERROR, GET_DASHBOARD_SUCCESS } from './actionsTypes';

const initialState = {
  isLoading: false,
  error: false,
  dashboard: {},
};

const currentDashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DASHBOARD: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_DASHBOARD_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }

    case GET_DASHBOARD_SUCCESS: {
      const { dashboard } = payload;
      return {
        ...state,
        isLoading: false,
        dashboard,
      };
    }
    default:
      return state;
  }
};

export default currentDashboardReducer;
