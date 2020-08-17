'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Files', {
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
    fileType: {
      type: Sequelize.STRING
    },
    fileSize: {
      type: Sequelize.STRING
    },
    name: {
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
  }),
  down: (queryInterface) => queryInterface.dropTable('Files')
};
