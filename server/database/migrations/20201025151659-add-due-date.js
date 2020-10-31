module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'ClassResources',
          'dueDate',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'ClassResources',
          'point',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('ClassResources', 'dueDate', {
          transaction: t,
        }),
        queryInterface.removeColumn('ClassResources', 'point', {
          transaction: t,
        }),
      ])
    ),
};
