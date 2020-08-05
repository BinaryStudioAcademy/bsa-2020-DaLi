import visualizationConfigRepository from "../repositories/visualizationConfigRepository";

export const createConfig = (data) => {
  return visualizationConfigRepository.create({
    color: data.color,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const getConfig = (id) => visualizationConfigRepository.getById(id);

export const updateConfig = (id, dataToUpdate) => {
  const oldConfig = visualizationConfigRepository.getById(id);

  const { color } = dataToUpdate;
  const newConfig = { ...oldConfig, color };
  return visualizationConfigRepository.updateById(id, newConfig);
};
