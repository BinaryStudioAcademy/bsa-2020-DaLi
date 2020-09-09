/* eslint-disable import/no-cycle */
import createError from 'http-errors';
import DBTable from '../repositories/dbTableRepository';
import DBManager from './DBManager/DBManagerService';

export const getAllByDatabaseId = async (id) => {
  const result = await DBTable.getAllByDatabaseId(id);
  return result;
};

export const getTableData = async (id, { settings, config }) => {
  let data = null;
  const { isSummarize, summarize } = config ? JSON.parse(config) : { isSummarize: false, summarize: {} };
  const table = await DBTable.getById(id);
  if (table) {
    let manager = new DBManager(table.DatabaseId);
    manager = await manager.create();
    try {
      await manager.init();
      data = await manager.getTableDataByName(table.name, settings, isSummarize, summarize);
    } catch (error) {
      data = null;
      throw createError(400, 'Get table data failed');
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
      schema = null;
      throw createError(400, 'Get table schema failed');
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
