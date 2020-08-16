'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CourseProgresses', {
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
    userId: {
      type: Sequelize.UUID
    },
    progress: {
      type: Sequelize.INTEGER
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
  down: (queryInterface) => queryInterface.dropTable('CourseProgresses')
};
