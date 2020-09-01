import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.hasMany(models.Visualization, {
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
        onDelete: 'cascade',
        hooks: true,
      });
      Collection.hasMany(models.Dashboard, {
        foreignKey: 'collections_id',
        sourceKey: models.Collection.id,
        onDelete: 'cascade',
        hooks: true,
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
        unique: true,
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
