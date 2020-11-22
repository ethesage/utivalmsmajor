module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'StudentCourses',
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
        queryInterface.removeColumn('StudentCourses', 'progress', {
          transaction: t,
        }),
      ])
    ),
};
