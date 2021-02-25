'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    expired: DataTypes.BOOLEAN,
    courseCohortId: DataTypes.UUID,
    totalUsedCount: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
  }, {});
  Coupon.associate = function(models) {
    // associations can be defined here
  };
  return Coupon;
};