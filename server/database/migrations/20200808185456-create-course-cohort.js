'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CourseCohorts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    cohortId: {
      type: Sequelize.UUID
    },
    courseId: {
      type: Sequelize.UUID
    },
    expiresAt: {
      type: Sequelize.DATE
    },
    dateRange: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM,
      values: ['ongoing', 'finished']
    },
    totalStudent: {
      type: Sequelize.INTEGER
    },
    totalClasses: {
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
  down: (queryInterface) => queryInterface.dropTable('CourseCohorts')
};
