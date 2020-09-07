import {
  GET_COLLECTIONS,
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_ERROR,
  FETCH_VISUALIZATIONS_ERROR,
  FETCH_VISUALIZATIONS,
  FETCH_VISUALIZATIONS_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_FORM_DATA,
  RESET_NOTIFICATION,
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_ERROR,
  GET_CURRENT_COLLECTION_SUCCESS,
  GET_CURRENT_COLLECTION,
  MOVE_TO_COLLECTION,
  MOVE_TO_COLLECTION_ERROR,
  MOVE_TO_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_SUCCESS,
} from './actionsTypes';

const initialState = {
  visualizations: [],
  dashboards: [],
  collections: [],
  currentCollection: {},
  isLoading: false,
  error: false,
  status: 'success',
  message: '',
  modal: {},
  formData: {
    name: '',
    description: '',
  },
};

const analyticsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_VISUALIZATIONS:
    case GET_COLLECTIONS:
    case GET_CURRENT_COLLECTION:
    case MOVE_TO_COLLECTION: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_VISUALIZATIONS_ERROR:
    case GET_COLLECTIONS_ERROR:
    case MOVE_TO_COLLECTION_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case FETCH_VISUALIZATIONS_SUCCESS: {
      const { visualizations } = payload;
      return {
        ...state,
        visualizations,
      };
    }
    case GET_COLLECTIONS_SUCCESS: {
      const { visualizations, dashboards, collections, currentCollection } = payload;
      return {
        ...state,
        isLoading: false,
        visualizations,
        dashboards,
        collections,
        currentCollection,
      };
    }
    case GET_CURRENT_COLLECTION_SUCCESS: {
      const { visualizations, dashboards, currentCollection, collections } = payload;
      return {
        ...state,
        isLoading: false,
        visualizations,
        dashboards,
        currentCollection,
        collections,
      };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        modal: {
          visualization: payload.visualization,
          dashboard: payload.dashboard,
          collection: payload.collection,
          type: payload.type,
          open: true,
        },
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: {},
        formData: {
          name: '',
          description: '',
        },
      };
    }
    case SET_FORM_DATA: {
      return {
        ...state,
        formData: payload,
      };
    }
    case RESET_NOTIFICATION: {
      return {
        ...state,
        message: '',
        status: 'success',
      };
    }
    case DELETE_COLLECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Collection successfully deleted',
        status: 'success',
      };
    }
    case ADD_COLLECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Collection successfully added',
        status: 'success',
      };
    }
    case UPDATE_COLLECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Collection successfully updated',
        status: 'success',
      };
    }
    case ADD_COLLECTION_ERROR: {
      return {
        ...state,
        error: payload,
        message: payload.message,
        status: 'error',
      };
    }
    case MOVE_TO_COLLECTION_SUCCESS: {
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    }
    default:
      return state;
  }
};

export default analyticsReducer;
