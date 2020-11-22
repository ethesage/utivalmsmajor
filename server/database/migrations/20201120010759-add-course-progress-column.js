module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'CourseCohorts',
          'progress',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('CourseCohorts', 'progress', {
          transaction: t,
        }),
      ])
    ),
};
