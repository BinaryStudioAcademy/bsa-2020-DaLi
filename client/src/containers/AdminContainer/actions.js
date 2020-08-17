import { CHANGE_VIEW } from './actionTypes';

export const changeView = (viewName) => {
  return {
    type: CHANGE_VIEW,
    payload: { viewName },
  };
};
