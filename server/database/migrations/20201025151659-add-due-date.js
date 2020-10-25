module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'ClassResouces',
          'dueDate',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'ClassResouces',
          'point',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          { transaction: t }
        ),
      ])),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('ClassResouces', 'dueDate', {
          transaction: t,
        }),
        queryInterface.removeColumn('ClassResouces', 'point', { transaction: t }),
      ])),
};

