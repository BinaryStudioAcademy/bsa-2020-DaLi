function createInitBarChartConfig(schema, getYKeys, getXKeys) {
  const YKeys = getYKeys(schema);
  const XKeys = getXKeys(schema);
  return {
    axisData: {
      XAxis: {
        availableKeys: XKeys,
        key: XKeys[0],
        label: XKeys[0],
        displayLabel: true,
      },
      YAxis: {
        availableKeys: YKeys,
        key: [YKeys[1]],
        label: YKeys[1],
        displayLabel: true,
      },
    },
    display: {
      goal: {
        display: false,
        value: 0,
        label: 'our goal',
      },
      color: ['#4aa1de'],
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
      lineType: '',
    },
  };
}

export default createInitBarChartConfig;
