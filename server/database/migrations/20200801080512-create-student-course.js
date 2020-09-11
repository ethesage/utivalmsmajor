'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('StudentCourses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    studentId: {
      type: Sequelize.UUID
    },
    courseCohortId: {
      type: Sequelize.UUID
    },
    courseId: {
      type: Sequelize.UUID
    },
    expiresAt: {
      type: Sequelize.DATE
    },
    isCompleted: {
      type: Sequelize.BOOLEAN
    },
    cohortId: {
      type: Sequelize.UUID
    },
    status: {
      type: Sequelize.ENUM,
      values: ['ongoing', 'finished']
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
  down: (queryInterface) => queryInterface.dropTable('StudentCourses')
};
