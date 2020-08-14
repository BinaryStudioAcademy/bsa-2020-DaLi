export const createNewVisualization = (currentVisualization, name, description) => {
  const createdVisualization = {
    ...currentVisualization,
    name,
    description,
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
