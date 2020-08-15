function createInitLineChartConfig(dataSample) {
  const keys = Object.keys(dataSample);
  if (keys.length < 2) throw Error('The table must contain at least 2 columns');
  return {
    axisData: {
      XAxis: {
        availableKeys: keys,
        key: keys[0],
        label: keys[0],
        displayLabel: true,
      },
      YAxis: {
        availableKeys: keys,
        key: keys[1],
        label: keys[1],
        displayLabel: true,
      },
    },
    display: {
      goal: {
        display: false,
        value: 0,
        label: 'our goal',
      },
      color: '#4aa1de',
      trendline: {
        display: false,
        trendlineType: 'linear',
        availableTrendlineTypes: ['linear', 'polynomial', 'exponential', 'logarithmical'],
        polynomial: {
          availableOrders: [2, 3, 4, 5],
          order: 2,
        },
      },
      showDataPointsValues: false,
      lineType: 'curveNatural',
    },
  };
}

export default createInitLineChartConfig;
