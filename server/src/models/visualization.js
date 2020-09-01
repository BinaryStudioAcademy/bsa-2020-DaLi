import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Visualization extends Model {
    static associate(models) {
      Visualization.belongsTo(models.DBTable, {
        foreignKey: 'tableId',
        sourceKey: models.DBTable.id,
        onDelete: 'cascade',
        hooks: true,
      });
      Visualization.belongsToMany(models.Dashboard, {
        through: models.DashboardVisualizations,
        foreignKey: 'dashboards_id',
        otherKey: 'visualizations_id',
        onDelete: 'cascade',
        hooks: true,
      });
      Visualization.belongsTo(models.Collection, {
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
      });
    }
  }
  Visualization.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.ENUM(['LINE_CHART', 'BAR_CHART', 'TABLE', 'MAP']),
        allowNull: false,
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
        allowNull: false,
      },
      tableId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Visualization',
    }
  );
  return Visualization;
};
