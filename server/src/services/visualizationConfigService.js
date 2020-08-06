import visualizationConfigRepository from '../repositories/visualizationConfigRepository';

export const createConfig = (data) => {
  return visualizationConfigRepository.create({
    color: data.color,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const getConfig = async (id) => {
  const config = await visualizationConfigRepository.getById(id);
  if (!config) {
    throw 'Config not found';
  }
  return config;
};

export const updateConfig = async (id, dataToUpdate) => {
  const oldConfig = await visualizationConfigRepository.getById(id);
  if (!oldConfig) {
    throw 'Config not found';
  }
  const { color } = dataToUpdate;
  const newConfig = { ...oldConfig, color, updatedAt: new Date() };
  return visualizationConfigRepository.updateById(id, newConfig);
};

export const deleteConfig = async (id) => {
  const isDeleted = await visualizationConfigRepository.deleteById(id);
  if (!isDeleted) {
    throw 'Config not found';
  }
  return isDeleted;
};
