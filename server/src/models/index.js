import Sequelize from 'sequelize';
import DATABASE_URL from '../config/dbConfig';
import VisualizationConfigModel from './visualizationConfig';
import User from './user';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

VisualizationConfigModel(sequelize, Sequelize.DataTypes);
User(sequelize, Sequelize.DataTypes);

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
