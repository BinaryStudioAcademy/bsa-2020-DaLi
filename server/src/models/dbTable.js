import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DBTable extends Model {}
  DBTable.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'DBTable',
    }
  );

  return DBTable;
};
