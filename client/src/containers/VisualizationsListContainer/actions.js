import { GET_VISUALISATIONS, DELETE_VISUALISATIONS, IS_LOADING, RESET_ERROR } from './actionsTypes';

export const getVisualizations = () => {
  return {
    type: GET_VISUALISATIONS,
  };
};

export const dltVisualizations = (id) => {
  return {
    type: DELETE_VISUALISATIONS,
    id,
  };
};

export const SetIsLoading = (payload) => {
  return {
    type: IS_LOADING,
    payload,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};
