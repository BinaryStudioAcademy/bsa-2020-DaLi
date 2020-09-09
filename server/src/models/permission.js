import { Model } from 'sequelize';
import { ACCESS_GRANTED, ACCESS_DENIED } from '../config/types';

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.UserGroups, {
        foreignKey: 'userGroups_id',
        sourceKey: models.UserGroups.id,
      });
      Permission.belongsTo(models.DBTable, {
        foreignKey: 'dbtable_id',
        sourceKey: models.DBTable.id,
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      permissionGranted: {
        type: DataTypes.ENUM([ACCESS_GRANTED, ACCESS_DENIED]),
        allowNull: false,
        defaultValue: ACCESS_DENIED,
      },
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );

  return Permission;
};
