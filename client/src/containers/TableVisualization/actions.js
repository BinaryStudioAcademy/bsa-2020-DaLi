import { FETCH_DATA, UPDATE_SORTING_CONFIG } from "./actionTypes";

export const fetchData = () => ({
  type: FETCH_DATA,
});

export const updateSortingConfig = ({ order, orderBy }) => ({
  type: UPDATE_SORTING_CONFIG,
  payload: { order, orderBy },
});
