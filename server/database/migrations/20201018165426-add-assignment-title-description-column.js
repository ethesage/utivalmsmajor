module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'ClassResources',
          'title',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'ClassResources',
          'description',
          {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('ClassResources', 'title', {
          transaction: t,
        }),
        queryInterface.removeColumn('ClassResources', 'description', {
          transaction: t,
        }),
      ])
    ),
};
