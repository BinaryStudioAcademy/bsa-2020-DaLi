import { GET_DASHBOARD } from './actionsTypes';

export const getDashboard = (id) => {
  return {
    type: GET_DASHBOARD,
    id,
  };
};
