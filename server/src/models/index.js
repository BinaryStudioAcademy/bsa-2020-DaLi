import Sequelize from 'sequelize';
import DATABASE_URL from '../config/dbConfig';
import { DEFAULT_COLLECTIONS, ADMIN_GROUP, ALL_USERS_GROUP } from '../config/types';

import User from './user';
import Visualization from './visualization';
import Dashboard from './dashboard';
import DashboardVisualizations from './dashboardVisualizations';
import UserGroups from './userGroups';
import UsersUserGroups from './usersUserGroups';
import Database from './database';
import DBTable from './dbTable';
import Permission from './permission';
import Collection from './collection';
import PermissionCollections from './permissionCollections';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

User(sequelize, Sequelize.DataTypes);
UserGroups(sequelize, Sequelize.DataTypes);
UsersUserGroups(sequelize, Sequelize.DataTypes);
Visualization(sequelize, Sequelize.DataTypes, Sequelize.Deferrable);
Dashboard(sequelize, Sequelize.DataTypes);
DashboardVisualizations(sequelize, Sequelize.DataTypes);
Database(sequelize, Sequelize.DataTypes);
DBTable(sequelize, Sequelize.DataTypes);
Permission(sequelize, Sequelize.DataTypes);
Collection(sequelize, Sequelize.DataTypes);
PermissionCollections(sequelize, Sequelize.DataTypes);

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

sequelize.sync().then(async () => {
  const groups = await models.UserGroups.findAll();
  if (groups.length >= 2) return;

  const defaultGroupsId = [];
  let defaultCollectionId = '';
  await models.UserGroups.create({
    name: ADMIN_GROUP,
  }).then((group) => defaultGroupsId.push(group.id));
  await models.UserGroups.create({
    name: ALL_USERS_GROUP,
  }).then((group) => defaultGroupsId.push(group.id));

  await models.Collection.create({ name: DEFAULT_COLLECTIONS }).then((collection) => {
    defaultCollectionId = collection.id;
    return defaultGroupsId;
  });
  defaultGroupsId.forEach(async (groupId) => {
    await models.PermissionCollections.create({
      permissionGranted: 'granted',
      userGroups_id: groupId,
      collections_id: defaultCollectionId,
    });
  });
});

export default models;
