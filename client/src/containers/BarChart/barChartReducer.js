import { stacking, FETCH_DATA_SUCCESS, dateStep } from "./types";

const initialState = {
  data: [],
  loading: true,
  settings: {
    axisData: {
      XAxis: {
        key: "createdAt",
        label: "Total",
        displayLabel: true,
      },
      YAxis: {
        key: "total",
        label: "Date",
        displayLabel: true,
      },
    },
    dateStep: dateStep.month,
    display: {
      stacking: stacking.notStack,
      goal: {
        display: true,
        value: -400,
        label: "Goal",
      },
      showTrendLine: true,
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
        loading: false,
      };
    default:
      return state;
  }
};
