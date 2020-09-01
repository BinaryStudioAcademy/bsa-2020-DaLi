import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.belongsToMany(models.Visualization, {
        through: models.CollectionVisualizations,
        foreignKey: 'collections_id',
        otherKey: 'visualizations_id',
      });
      Collection.belongsToMany(models.Dashboard, {
        through: models.CollectionDashboards,
        foreignKey: 'collections_id',
        otherKey: 'dashboards_id',
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
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Collection',
    }
  );

  return Collection;
};
