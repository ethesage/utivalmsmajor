module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Trainers',
          'courseCohortId',
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
        queryInterface.removeColumn('Trainers', 'CourseCohortId', {
          transaction: t,
        }),
      ])
    ),
};
