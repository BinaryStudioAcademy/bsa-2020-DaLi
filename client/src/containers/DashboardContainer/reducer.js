import {
  GET_DASHBOARD,
  GET_DASHBOARD_ERROR,
  GET_DASHBOARD_SUCCESS,
  UPDATE_DASHBOARD,
  UPDATE_DASHBOARD_SUCCESS,
  UPDATE_DASHBOARD_ERROR,
} from './actionsTypes';

const initialState = {
  isLoading: false,
  error: false,
  success: null,
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
      // dashboard.config = JSON.parse(dashboard.config);
      // console.log(dashboard);
      return {
        ...state,
        isLoading: false,
        dashboard,
      };
    }

    case UPDATE_DASHBOARD: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UPDATE_DASHBOARD_SUCCESS: {
      const { dashboard } = payload;
      return {
        ...state,
        isLoading: false,
        success: 'Dashboard was updated',
        dashboard,
      };
    }

    case UPDATE_DASHBOARD_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export default currentDashboardReducer;
