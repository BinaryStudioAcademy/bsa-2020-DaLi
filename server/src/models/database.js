import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Database extends Model {
    static associate(models) {
      Database.hasMany(models.DBTable, {
        onDelete: 'cascade',
      });
    }
  }
  Database.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      dbNickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      host: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      port: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dbName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dbPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Database',
    }
  );
  return Database;
};
