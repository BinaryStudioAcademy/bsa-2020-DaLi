import DatabaseRepository from '../repositories/databaseRepository';

export const getDatabases = async () => {
  const result = await DatabaseRepository.getAll();
  return result;
};

export const createDatabase = async (data) => {
  const result = await DatabaseRepository.create(data);
  return result;
};

export const deleteDatabase = async (id) => {
  const item = await DatabaseRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await DatabaseRepository.deleteById(id);
  return result;
};

export const updateDatabase = async (id, dataToUpdate) => {
  const item = await DatabaseRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await DatabaseRepository.updateById(id, dataToUpdate);
  return result;
};

export const getDatabase = async (id) => {
  const item = await DatabaseRepository.getById(id);
  if (!item) {
    return null;
  }
  return item;
};
