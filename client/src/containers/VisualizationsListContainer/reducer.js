import {
  GET_VISUALISATIONS_SUCCESS,
  GET_VISUALISATIONS_ERROR,
  DELETE_VISUALISATIONS_SUCCESS,
  DELETE_VISUALISATIONS_ERROR,
  IS_LOADING,
  RESET_ERROR,
} from './actionsTypes';

const initialState = {
  visualizations: [
    {
      id: 1,
      name: 'First visualization',
      type: 'LINE_CHART',
      description: '',
      config: {
        axisData: {
          XAxis: {
            key: 'createdAt',
            label: 'Total',
            displayLabel: true,
          },
          YAxis: {
            key: 'total',
            label: 'Date',
            displayLabel: true,
          },
        },
        display: {
          goal: {
            display: true,
            value: 100,
            label: 'Goal',
          },
          color: '#4aa1de',

          showTrendLine: true,
          showDataPointsValues: true,
        },
      },
    },
    {
      id: 2,
      name: 'Second visualization',
      type: 'BAR_CHART',
      description: '',

      config: {
        axisData: {
          XAxis: {
            key: 'createdAt',
            label: 'Total',
            displayLabel: true,
          },
          YAxis: {
            key: 'total',
            label: 'Date',
            displayLabel: true,
          },
        },
        display: {
          goal: {
            display: true,
            value: 1400,
            label: 'Goal',
          },
          color: '#4AA1DE',
          showTrendLine: false,
          showDataPointsValues: true,
        },
      },
    },
    {
      id: 3,
      name: 'It is the best my visualization',
      type: 'TABLE',
      description: '',
      config: {
        columns: [
          { id: 'id', title: 'Id', type: 'id', order: 0 },
          { id: 'userId', title: 'UserId', type: 'id', order: 1 },
          { id: 'productId', title: 'ProductId', type: 'id', order: 2 },
          { id: 'total', title: 'Total', type: 'number', order: 3 },
          { id: 'discount', title: 'Discount', type: 'number', order: 4 },
          { id: 'createdAt', title: 'CreatedAt', type: 'date', order: 5 },
          { id: 'quantity', title: 'Quantity', type: 'number', order: 6 },
        ],
        sort: {
          order: 'asc',
          orderBy: 'id',
        },
      },
    },
    {
      id: 4,
      name: 'Other visualization',
      type: 'TABLE',
      description: '',
      config: {
        columns: [
          { id: 'id', title: 'Id', type: 'id', order: 0 },
          { id: 'userId', title: 'UserId', type: 'id', order: 1 },
          { id: 'productId', title: 'ProductId', type: 'id', order: 2 },
          { id: 'total', title: 'Total', type: 'number', order: 3 },
          { id: 'discount', title: 'Discount', type: 'number', order: 4 },
          { id: 'createdAt', title: 'CreatedAt', type: 'date', order: 5 },
          { id: 'quantity', title: 'Quantity', type: 'number', order: 6 },
        ],
        sort: {
          order: 'asc',
          orderBy: 'id',
        },
      },
    },
    {
      id: 5,
      name: 'Last visualization',
      type: 'BAR_CHART',
      description: '',

      config: {
        axisData: {
          XAxis: {
            key: 'createdAt',
            label: 'Total',
            displayLabel: true,
          },
          YAxis: {
            key: 'total',
            label: 'Date',
            displayLabel: true,
          },
        },
        chart: {
          margin: {
            top: 40,
            right: 40,
            bottom: 60,
            left: 60,
          },
          height: 600,
          width: 1000,
        },
        display: {
          goal: {
            display: true,
            value: 1400,
            label: 'Goal',
          },
          color: '#4AA1DE',
          showTrendLine: false,
          showDataPointsValues: true,
        },
      },
    },
  ],
  isLoading: false,
  error: null,
};

const visualizationsListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VISUALISATIONS_SUCCESS: {
      return {
        ...state,
        visualizations: [...payload.visualizations],
      };
    }
    case GET_VISUALISATIONS_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    case DELETE_VISUALISATIONS_SUCCESS: {
      return {
        ...state,
        visualizations: [...payload.visualizations],
      };
    }
    case DELETE_VISUALISATIONS_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
};

export default visualizationsListReducer;
