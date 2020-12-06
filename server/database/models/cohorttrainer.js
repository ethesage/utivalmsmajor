'use strict';
module.exports = (sequelize, DataTypes) => {
  const CohortTrainer = sequelize.define('CohortTrainer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: DataTypes.UUID,
    classId: DataTypes.UUID,
    courseCohortId: DataTypes.UUID
  }, {});
  CohortTrainer.associate = function(models) {
    // associations can be defined here
  };
  return CohortTrainer;
};