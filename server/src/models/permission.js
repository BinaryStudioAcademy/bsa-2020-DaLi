import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.UserGroups, {
        foreignKey: 'usergroups_id',
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );

  return Permission;
};
