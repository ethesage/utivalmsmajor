module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Users',
          'status',
          {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'active',
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Users', 'status', {
          transaction: t,
        }),
      ])
    ),
};
