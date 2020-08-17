import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UsersUserGroups extends Model {
    static associate(models) {
      UsersUserGroups.belongsTo(models.UserGroups, {
        foreignKey: 'dashboards_id',
        sourceKey: models.UserGroups.id,
      });
      UsersUserGroups.belongsTo(models.User, {
        foreignKey: 'visualizations_id',
        sourceKey: models.User.id,
      });
    }
  }
  UsersUserGroups.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'UsersUserGroups',
    }
  );

  return UsersUserGroups;
};
