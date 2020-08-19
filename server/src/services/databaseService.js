/* eslint-disable import/no-cycle */
import DatabaseRepository from '../repositories/databaseRepository';
import DBManager from './DBManager/DBManagerService';
import { createDBTable } from './dbTableService';

export const getDatabases = async () => {
  const result = await DatabaseRepository.getAll();
  return result;
};

export const createDatabase = async (database) => {
  let manager = new DBManager(database);
  manager = await manager.create();

  try {
    await manager.init();
    const tablenames = await manager.getTablenames();
    database = await DatabaseRepository.create(database);
    tablenames.forEach((name) => {
      createDBTable({ DatabaseId: database.id, name });
    });
  } catch (error) {
    console.log('///////////////////// ON CREATE DB TABLE GENERATOR FAILED');
    console.log(error);
    console.log('Incoming DB INVALID');
    console.log('///////////////////// ON CREATE DB TABLE GENERATOR FAILED');
    database = null;
  }

  return database;
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
