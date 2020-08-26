/* eslint-disable import/no-cycle */
import createError from 'http-errors';
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
      // console.log('///////////////////// ON GET TABLE DATA FAILED');
      // console.log(error);
      // console.log('///////////////////// ON GET TABLE DATA FAILED');
      data = null;
      throw createError(500, 'Get table data failed');
    }

    manager.destroy();
  }
  return data;
};

export const getTableSchema = async (id) => {
  let schema = null;
  const table = await DBTable.getById(id);
  if (table) {
    let manager = new DBManager(table.DatabaseId);
    manager = await manager.create();

    try {
      await manager.init();
      schema = await manager.getTableSchemaByName(table.name);
    } catch (error) {
      // console.log('///////////////////// ON GET TABLE SCHEMA FAILED');
      // console.log(error);
      // console.log('///////////////////// ON GET TABLE SCHEMA FAILED');
      schema = null;
      throw createError(500, 'Get table schema failed');
    }

    manager.destroy();
  }
  return schema;
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
    throw createError(404, `Table with id of ${id} not found`);
  }
  const result = await DBTable.deleteById(id);
  return result;
};

export const updateDBTable = async (id, dataToUpdate) => {
  const item = await DBTable.getById(id);
  if (!item) {
    throw createError(404, `Table with id of ${id} not found`);
  }
  const result = await DBTable.updateById(id, dataToUpdate);
  return result;
};

export const getDBTable = async (id) => {
  const item = await DBTable.getById(id);
  if (!item) {
    throw createError(404, `Table with id of ${id} not found`);
  }
  return item;
};
