'use strict';

module.exports = (sequelize, DataTypes) => {
  const SavedCoupon = sequelize.define('SavedCoupon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    couponId: DataTypes.UUID
  }, {});
  SavedCoupon.associate = () => {
    // associations can be defined here
  };
  return SavedCoupon;
};
