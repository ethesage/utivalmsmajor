module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Trainers',
          'cohortId',
          {
            type: Sequelize.UUID,
            allowNull: true,
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Trainers', 'CohortId', {
          transaction: t,
        }),
      ])
    ),
};
