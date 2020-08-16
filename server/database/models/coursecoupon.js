'use strict';

module.exports = (sequelize, DataTypes) => {
  const CourseCoupon = sequelize.define('CourseCoupon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    courseId: DataTypes.UUID,
    coupon: DataTypes.STRING,
    expires: DataTypes.DATE
  }, {});
  CourseCoupon.associate = () => {
    // associations can be defined here
  };
  return CourseCoupon;
};
