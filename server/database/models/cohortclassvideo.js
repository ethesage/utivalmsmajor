/* eslint-disable valid-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CohortClassVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CohortClassVideo.belongsTo(models.Classes, {
        foreignKey: 'classId',
        onDelete: 'CASCADE',
      });
    }
  }
  CohortClassVideo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      classId: DataTypes.UUID,
      courseCohortId: DataTypes.UUID,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CohortClassVideo',
    }
  );
  return CohortClassVideo;
};
