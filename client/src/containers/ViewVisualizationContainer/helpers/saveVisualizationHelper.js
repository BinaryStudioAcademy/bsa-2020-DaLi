export const createNewVisualization = (currentVisualization, name, description, tableId) => {
  const createdVisualization = {
    ...currentVisualization,
    name,
    description,
    tableId,
    config: JSON.stringify(currentVisualization.config),
  };
  return createdVisualization;
};

export const createUpdatedVisualization = (currentVisualization) => {
  const updatedVisualization = {
    ...currentVisualization,
    config: JSON.stringify(currentVisualization.config),
  };
  return updatedVisualization;
};
