'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CourseCoupons', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    courseId: {
      type: Sequelize.UUID
    },
    coupon: {
      type: Sequelize.STRING
    },
    expires: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('CourseCoupons')
};
