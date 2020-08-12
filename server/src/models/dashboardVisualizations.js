import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DashboardVisualizations extends Model {

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
