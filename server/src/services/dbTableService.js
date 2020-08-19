/* eslint-disable import/no-cycle */
import DBTable from '../repositories/dbTableRepository';
import DBManager from './DBManager/DBManagerService';

export const getAllByDatabaseId = async (id) => {
  const result = await DBTable.getAllByDatabaseId(id);
  return result;
};

export const getTableData = async (id) => {
  let data = null;
  const table = await DBTable.getById(id);
  if (table) {
    let manager = new DBManager(table.DatabaseId);
    manager = await manager.create();

    try {
      await manager.init();
      data = await manager.getTableDataByName(table.name);
    } catch (error) {
      console.log('///////////////////// ON GET TABLE DATA FAILED');
      console.log(error);
      console.log('///////////////////// ON GET TABLE DATA FAILED');
      data = null;
    }
  }
  return data;
};

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
