'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SavedCoupons', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    userId: {
      type: Sequelize.UUID
    },
    couponId: {
      type: Sequelize.UUID
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
  down: (queryInterface) => queryInterface.dropTable('SavedCoupons')
};
