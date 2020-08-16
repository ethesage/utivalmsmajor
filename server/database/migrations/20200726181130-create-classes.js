'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Classes', {
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
    courseCohortId: {
      type: Sequelize.UUID
    },
    trainerId: {
      type: Sequelize.UUID
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    link: {
      type: Sequelize.STRING
    },
    dateRange: {
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
  down: (queryInterface) => queryInterface.dropTable('Classes')
};
