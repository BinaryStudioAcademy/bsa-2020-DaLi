import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DashboardVisualizations extends Model {
    static associate(models) {
      DashboardVisualizations.belongsTo(models.Dashboard, {
        foreignKey: 'dashboards_id',
        sourceKey: models.Dashboard.id,
      });
      DashboardVisualizations.belongsTo(models.Visualization, {
        foreignKey: 'visualizations_id',
        sourceKey: models.Visualization.id,
      });
    }
  }
  DashboardVisualizations.init(
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
      modelName: 'DashboardVisualizations',
    }
  );

  return DashboardVisualizations;
};
