'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ClassDays', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    classId: {
      type: Sequelize.UUID
    },
    date: {
      type: Sequelize.DATE
    },
    courseId: {
      type: Sequelize.UUID
    },
    time: {
      type: Sequelize.TIME
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
  down: (queryInterface) => queryInterface.dropTable('ClassDays')
};
