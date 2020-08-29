function createInitMapConfig(sample) {
  const keys = [];
  sample.forEach((record) => {
    keys.push(record.column_name);
  });
  const initTableConfig = {
    keys,
    name: '',
    latitude: '',
    longitude: '',
    view: 'Google heat map',
    isSatellite: false,
    color: 'rgba(255, 0, 0, 1)',
    showDataPointsValues: false,
  };
  return initTableConfig;
}

export default createInitMapConfig;
