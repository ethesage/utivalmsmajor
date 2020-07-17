module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Users',
          'byadmin',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
          },
          { transaction: t }
        ),
      ])),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Users', 'byadmin', {
          transaction: t,
        })
      ])),
};
