// const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emailNotify: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      verifiedEmail: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      verifiedPayment: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        // defaultValue: false,
      },
      linkedin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      firstentry: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      inAppNotify: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      profilePic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
