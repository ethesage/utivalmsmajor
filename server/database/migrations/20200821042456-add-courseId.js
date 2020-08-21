module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'StudentCourses',
          'courseId',
          {
            type: Sequelize.UUID,
          },
          { transaction: t }
        ),
      ])),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('StudentCourses', 'courseId', {
          transaction: t,
        })
      ])),
};
