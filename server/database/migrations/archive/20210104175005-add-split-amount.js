module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Courses',
          'initialSplitAmount',
          {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: 0,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Courses',
          'finialSplitAmount',
          {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: 0,
          },
          { transaction: t }
        )
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Courses', 'initialSplitAmount', {
          transaction: t,
        }),
        queryInterface.removeColumn('Courses', 'finialSplitAmount', {
          transaction: t,
        })
      ])
    ),
};
