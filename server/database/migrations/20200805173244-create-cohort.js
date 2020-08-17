'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Cohorts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    cohort: {
      type: Sequelize.STRING
    },
    totalCourse: {
      type: Sequelize.INTEGER
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
  down: (queryInterface) => queryInterface.dropTable('Cohorts')
};
