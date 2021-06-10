module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Users',
          'providerId',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Users',
          'socialUid',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Users', 'providerId', {
          transaction: t,
        }),
        queryInterface.removeColumn('Users', 'socialUid', {
          transaction: t,
        }),
      ])
    ),
};
