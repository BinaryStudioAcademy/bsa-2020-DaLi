import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.hasMany(models.Visualization, {
        as: 'visualizations',
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
        onDelete: 'cascade',
        hooks: true,
      });
      Collection.hasMany(models.Dashboard, {
        as: 'dashboards',
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
        onDelete: 'cascade',
        hooks: true,
      });
      Collection.hasMany(models.PermissionCollections, {
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
        onDelete: 'cascade',
        hooks: true,
      });
      Collection.belongsTo(models.User, {
        foreignKey: 'users_id',
        sourceKey: models.User.id,
      });
    }
  }
  Collection.init(
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
        unique: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
    },
    {
      sequelize,
      modelName: 'Collection',
    }
  );

  return Collection;
};
