import Sequelize from 'sequelize';
import DATABASE_URL from '../config/dbConfig';
import User from './user';
import VisualizationConfigModel from './visualizationConfig';
import Visualization from './visualization';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

User(sequelize, Sequelize.DataTypes);
Visualization(sequelize, Sequelize.DataTypes, Sequelize.Deferrable);
VisualizationConfigModel(sequelize, Sequelize.DataTypes);

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
