module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.changeColumn('Users', 'firstentry', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      }),
    ]),

  down: (queryInterface) =>
    Promise.all([queryInterface.changeColumn('Users', 'firstentry')]),
};
