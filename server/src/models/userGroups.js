import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserGroups extends Model {
    static associate(models) {
      UserGroups.belongsToMany(models.User, {
        through: models.UsersUserGroups,
        foreignKey: 'userGroups_id',
        otherKey: 'users_id',
      });
      UserGroups.hasMany(models.Permission, {
        foreignKey: 'userGroups_id',
        otherKey: 'permission_id',
        onDelete: 'cascade',
        hooks: true,
      });
      UserGroups.hasMany(models.PermissionCollections, {
        foreignKey: 'userGroups_id',
        sourceKey: models.User.id,
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  UserGroups.init(
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
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'UserGroups',
    }
  );

  return UserGroups;
};
