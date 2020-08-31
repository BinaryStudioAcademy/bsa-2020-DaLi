/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
import createError from 'http-errors';
import DatabaseRepository from '../repositories/databaseRepository';
import DBManager from './DBManager/DBManagerService';
import { createDBTable, getAllByDatabaseId, deleteDBTable } from './dbTableService';
import { setInitialDBPermissions } from './permissionService';

export const getDatabases = async () => {
  const result = await DatabaseRepository.getAll();
  return result;
};

export const getDatabaseTables = async (id) => {
  const tables = await getAllByDatabaseId(id);
  return tables;
};

export const getDatabase = async (id) => {
  const item = await DatabaseRepository.getById(id);
  if (!item) {
    throw createError(404, `Database with id of ${id.id} not found`);
  }
  return item;
};

export const updateDatabaseTables = async (id) => {
  const database = await getDatabase({ id });
  let manager = new DBManager(database);
  manager = await manager.create();

  try {
    await manager.init();
    const savedTables = await getAllByDatabaseId(id);
    const savedTableNames = savedTables.map((i) => i.name);
    // dbName is necessary for fetching tables list for mysql
    const currentTableNames = await manager.getTablenames(database.dbName);

    const newTableNames = savedTableNames.reduce(
      (resultTables, oldTableName) => {
        if (resultTables.includes(oldTableName)) {
          return resultTables.filter((t) => t !== oldTableName);
        }
        return resultTables;
      },
      [...currentTableNames]
    );

    const excessTableNames = currentTableNames.reduce(
      (resultTables, currTableName) => {
        if (resultTables.includes(currTableName)) {
          return resultTables.filter((t) => t !== currTableName);
        }
        return resultTables;
      },
      [...savedTableNames]
    );

    excessTableNames.forEach(async (name) => {
      const table = savedTables.find((t) => t.name === name);
      await deleteDBTable({ id: table.id });
    });

    newTableNames.forEach(async (name) => {
      const table = await createDBTable({ DatabaseId: database.id, name });
      await setInitialDBPermissions(table.id);
    });

    return {
      added: newTableNames,
      deleted: excessTableNames,
    };
  } catch (error) {
    throw createError(400, 'Database tables update failed');
  }
};

export const createDatabase = async (database) => {
  const isRepeat = await DatabaseRepository.findDatabaseWithCredentials({ ...database });
  if (isRepeat) {
    throw createError(409, 'Such database is already exists');
  }

  let manager = new DBManager(database);
  manager = await manager.create();

  try {
    await manager.init();
    // dbName is necessary for fetching tables list for mysql
    const tablenames = await manager.getTablenames(database.dbName);
    database = await DatabaseRepository.create(database);
    tablenames.forEach(async (name) => {
      const result = await createDBTable({ DatabaseId: database.id, name });
      await setInitialDBPermissions(result.id);
    });
  } catch (error) {
    database = null;
    throw createError(400, `Table creation failed, invalid database credentials: ${error.message}`);
  }

  await manager.destroy();

  return database;
};

export const deleteDatabase = async (id) => {
  const item = await DatabaseRepository.getById(id);
  if (!item) {
    throw createError(404, `Database with id of ${id.id} not found`);
  }
  const result = await DatabaseRepository.deleteById(id);
  return result;
};

export const updateDatabase = async (id, dataToUpdate) => {
  const item = await DatabaseRepository.getById(id);
  if (!item) {
    throw createError(404, `Database with id of ${id.id} not found`);
  }
  const result = await DatabaseRepository.updateById(id, dataToUpdate);
  return result;
};
