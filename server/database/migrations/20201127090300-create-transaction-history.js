'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TransactionHistories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      studentId: {
        type: Sequelize.UUID
      },
      tnxRef: {
        type: Sequelize.STRING
      },
      transactionId: {
        type: Sequelize.STRING
      },
      courseAmount: {
        type: Sequelize.STRING
      },
      paidAmount: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      courseCohortId: {
        type: Sequelize.UUID
      },
      courseId: {
        type: Sequelize.UUID
      },
      remainingBalance: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TransactionHistories');
  }
};