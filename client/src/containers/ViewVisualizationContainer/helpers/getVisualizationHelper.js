const getVisualization = (visualizations, id) => {
  const visualization = visualizations.filter((visualization) => visualization.id === id)[0];
  return { ...visualization, config: JSON.parse(visualization.config) };
};

export default getVisualization;
