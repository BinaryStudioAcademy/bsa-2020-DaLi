export const createNewVisualization = (currentVisualization, name, description, tableId) => {
  const { type, config, datasetSettings } = currentVisualization;
  // datasetSettings.push({
  //   columnName: 'createdAt',
  //   columnType: 'date',
  //   greaterThan: '2012-03-27T07:27:22Z',
  //   lessThan: '2020-09-01T08:04:40.633Z',
  // });
  const createdVisualization = {
    name,
    description,
    tableId,
    type,
    datasetSettings: datasetSettings.map((s) => JSON.stringify(s)),
    config: JSON.stringify(config),
  };
  return createdVisualization;
};

export const createUpdatedVisualization = (currentVisualization) => {
  const { type, name, description, config, datasetSettings, tableId } = currentVisualization;
  const updatedVisualization = {
    type,
    name,
    description,
    tableId,
    datasetSettings: datasetSettings.map((s) => JSON.stringify(s)),
    config: JSON.stringify(config),
  };
  return updatedVisualization;
};
