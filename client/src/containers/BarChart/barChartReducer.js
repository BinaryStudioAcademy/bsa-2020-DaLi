import { stacking, FETCH_DATA_SUCCESS } from "./types";

const initialState = {
  data: [],
  settings: {
    axisData: {
      XAxis: {
        key: "",
        label: "",
        display: true,
      },
      YAxis: {
        key: "",
        label: "",
        display: true,
      },
    },
    display: {
      stacking: stacking.notStack,
      goal: {
        display: true,
        value: 0,
        label: "goal",
      },
      trendLine: true,
      showDataPointsValues: true,
    },
  },
};

export const barChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};
