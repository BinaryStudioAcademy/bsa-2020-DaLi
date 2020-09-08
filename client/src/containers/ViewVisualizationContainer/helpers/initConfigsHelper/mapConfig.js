function createInitMapConfig(sample) {
  const keys = [];
  sample.forEach((record) => {
    keys.push(record.column_name);
  });

  const mapView = {
    1: 'Google heat map',
    2: 'Google bubble map',
    3: 'D3 bubble map (New York)',
    4: 'D3 bubble map (world)',
  };

  const initTableConfig = {
    keys,
    name: keys[0],
    zoom: 4,
    mapCenter: { lat: 40.71274, lng: -74.005974 },
    latitude: '',
    longitude: '',
    viewList: mapView,
    view: mapView[1],
    isSatellite: false,
    color: 'rgba(255, 0, 0, 1)',
  };
  return initTableConfig;
}

export default createInitMapConfig;
