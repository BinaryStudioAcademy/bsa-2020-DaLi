export const createNewVisualization = (currentVisualization, name, description, tableId) => {
  const { type, config, datasetSettings } = currentVisualization;
<<<<<<< HEAD
=======

>>>>>>> updated summarize bar
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
