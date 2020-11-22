module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Classes',
          'started',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          { transaction: t }
        )
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Classes', 'started', {
          transaction: t,
        })
      ])
    ),
};
