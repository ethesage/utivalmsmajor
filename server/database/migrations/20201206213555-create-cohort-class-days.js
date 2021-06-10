module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CohortClassDays', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      classId: {
        type: Sequelize.UUID,
      },
      courseCohortId: {
        type: Sequelize.UUID,
      },
      date: {
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.TIME,
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
  down: (queryInterface) => queryInterface.dropTable('CohortClassDays'),
};
