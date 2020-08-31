export const createNewVisualization = (currentVisualization, name, description, tableId) => {
<<<<<<< HEAD
  delete currentVisualization.data;
  delete currentVisualization.schema;
=======
  const { type, config, datasetSettings } = currentVisualization;
>>>>>>> update visualization with datasetSettings
  const createdVisualization = {
    name,
    description,
    tableId,
    type,
    datasetSettings: datasetSettings.map((s) => JSON.stringify(s)),
    config: JSON.stringify(config),
  };
  console.log('createss', createdVisualization);
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
  console.log('updatess', updatedVisualization);
  return updatedVisualization;
};
