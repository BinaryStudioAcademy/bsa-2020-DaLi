const mapView = new Map();

mapView.set(1, 'Google heat map');
mapView.set(2, 'Google bubble map');
mapView.set(3, 'D3 bubble map (New York)');
mapView.set(4, 'D3 bubble map (world)');

function createInitMapConfig(sample) {
  const keys = [];
  sample.forEach((record) => {
    keys.push(record.column_name);
  });
  const initTableConfig = {
    keys,
    name: keys[0],
    latitude: '',
    longitude: '',
    viewList: mapView,
    view: mapView.get(1),
    isSatellite: false,
    color: 'rgba(255, 0, 0, 1)',
    showDataPointsValues: false,
  };
  return initTableConfig;
}

export default createInitMapConfig;
