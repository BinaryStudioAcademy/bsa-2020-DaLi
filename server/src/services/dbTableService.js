import DBTable from '../repositories/dbTableRepository';

export const getDBTables = async () => {
  const result = await DBTable.getAll();
  return result;
};

export const createDBTable = async (data) => {
  const result = await DBTable.create(data);
  return result;
};

export const deleteDBTable = async (id) => {
  const item = await DBTable.getById(id);
  if (!item) {
    return null;
  }
  const result = await DBTable.deleteById(id);
  return result;
};

export const updateDBTable = async (id, dataToUpdate) => {
  const item = await DBTable.getById(id);
  if (!item) {
    return null;
  }
  const result = await DBTable.updateById(id, dataToUpdate);
  return result;
};

export const getDBTable = async (id) => {
  const item = await DBTable.getById(id);
  if (!item) {
    return null;
  }
  return item;
};
