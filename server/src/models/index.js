import Sequelize from "sequelize";
import databaseUrl from "../config/db.config";
import User from "./user";

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
});

User(sequelize, Sequelize.DataTypes);

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export default models;
