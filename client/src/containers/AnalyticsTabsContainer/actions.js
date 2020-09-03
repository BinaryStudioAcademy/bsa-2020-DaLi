import {
  GET_COLLECTIONS,
  DELETE_VISUALIZATION,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_FORM_DATA,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
  RESET_NOTIFICATION,
  GET_CURRENT_COLLECTION,
  MOVE_TO_COLLECTION,
} from './actionsTypes';

export const getAnalytics = () => {
  return {
    type: GET_COLLECTIONS,
  };
};

export const deleteVisualization = (id) => {
  return {
    type: DELETE_VISUALIZATION,
    id,
  };
};

export const addDashboard = (newDashboard) => {
  return {
    type: ADD_DASHBOARD,
    newDashboard,
  };
};

export const deleteDashboard = ({ id, collectionId }) => {
  return {
    type: DELETE_DASHBOARD,
    id,
    collectionId,
  };
};

export const addCollection = (payload) => {
  return {
    type: ADD_COLLECTION,
    payload,
  };
};

export const deleteCollection = (id) => {
  return {
    type: DELETE_COLLECTION,
    id,
  };
};

export const updateCollection = (payload) => {
  return {
    type: UPDATE_COLLECTION,
    payload,
  };
};

export const openModal = (payload = {}) => {
  return {
    type: OPEN_MODAL,
    payload,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const setFormData = (payload) => {
  return {
    type: SET_FORM_DATA,
    payload,
  };
};

export const resetNotification = () => {
  return {
    type: RESET_NOTIFICATION,
  };
};

export const getCollection = (id) => {
  return {
    type: GET_CURRENT_COLLECTION,
    id,
  };
};

export const moveToCollection = (payload) => {
  return {
    type: MOVE_TO_COLLECTION,
    payload,
  };
};
