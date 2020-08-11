const getVisualization = (visualizations, id) =>
  visualizations.filter((visualization) => visualization.id === Number(id))[0];

export default getVisualization;
