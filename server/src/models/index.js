import Sequelize from 'sequelize';
import DATABASE_URL from '../config/dbConfig';

import User from './user';
import Visualization from './visualization';
import Dashboard from './dashboard';
import DashboardVisualizations from './dashboardVisualizations';
import Database from './database';
import DBTable from './dbTable';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

User(sequelize, Sequelize.DataTypes);
Visualization(sequelize, Sequelize.DataTypes, Sequelize.Deferrable);
Dashboard(sequelize, Sequelize.DataTypes);
DashboardVisualizations(sequelize, Sequelize.DataTypes);
Database(sequelize, Sequelize.DataTypes);
DBTable(sequelize, Sequelize.DataTypes);

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
