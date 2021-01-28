'use strict';
module.exports = (sequelize, DataTypes) => {
  const TempPayment = sequelize.define('TempPayment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    sessionId: DataTypes.TEXT,
    courseCohortId: DataTypes.UUID
  }, {});
  TempPayment.associate = function(models) {
    // associations can be defined here
  };
  return TempPayment;
};