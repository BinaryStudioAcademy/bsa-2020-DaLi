const visualizationConfig = (sequelize, DataTypes) => {
  const VisualizationConfig = sequelize.define(
    "visualizationConfig",
    {
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );

  return VisualizationConfig;
};

export default visualizationConfig;
