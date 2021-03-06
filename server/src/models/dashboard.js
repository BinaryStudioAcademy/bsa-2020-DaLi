import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Dashboard extends Model {
    static associate(models) {
      Dashboard.belongsToMany(models.Visualization, {
        through: models.DashboardVisualizations,
        foreignKey: 'dashboards_id',
        otherKey: 'visualizations_id',
      });
      Dashboard.belongsTo(models.Collection, {
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
      });
    }
  }
  Dashboard.init(
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
      config: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Dashboard',
    }
  );

  return Dashboard;
};
