import { Model } from 'sequelize';
import { ACCESS_GRANTED, ACCESS_DENIED, ACCESS_LIMITED } from '../config/types';

export default (sequelize, DataTypes) => {
  class PermissionCollections extends Model {
    static associate(models) {
      PermissionCollections.belongsTo(models.UserGroups, {
        as: 'userGroups',
        foreignKey: 'userGroups_id',
        sourceKey: models.UserGroups.id,
      });
      PermissionCollections.belongsTo(models.Collection, {
        as: 'collections',
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
      });
    }
  }
  PermissionCollections.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      permissionGranted: {
        type: DataTypes.ENUM([ACCESS_GRANTED, ACCESS_DENIED, ACCESS_LIMITED]),
        allowNull: false,
        defaultValue: ACCESS_DENIED,
      },
    },
    {
      sequelize,
      modelName: 'PermissionCollections',
    }
  );

  return PermissionCollections;
};
