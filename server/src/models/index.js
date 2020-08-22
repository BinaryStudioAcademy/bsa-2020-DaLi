import Sequelize from 'sequelize';
import config from '../config/dbConfig';
import User from './user';
import Visualization from './visualization';
import Dashboard from './dashboard';
import DashboardVisualizations from './dashboardVisualizations';
import UserGroups from './userGroups';
import UsersUserGroups from './usersUserGroups';
import Database from './database';
import DBTable from './dbTable';
import Permission from './permission';

const { database, username, password, host, dialect } = config.development;

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
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

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

//временная заглушка для создания двух обязательных групп
setTimeout(async () => {
  try {
    const groups = await models.UserGroups.findAll();
    if(groups.length<2) {
      await models.UserGroups.create({ name: 'Administrators' });
      await models.UserGroups.create({ name: 'All Users' });
    }
  } catch (error) {
    console.log(error);
  }
},5000);

export default models;
