module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Courses',
          'currency_type',
          {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'local',
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Courses', 'currency_type', {
          transaction: t,
        }),
      ])
    ),
};
