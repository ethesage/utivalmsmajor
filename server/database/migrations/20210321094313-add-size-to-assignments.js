module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Assignments',
          'size',
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
        queryInterface.removeColumn('Assignments', 'size', {
          transaction: t,
        }),
      ])
    ),
};
