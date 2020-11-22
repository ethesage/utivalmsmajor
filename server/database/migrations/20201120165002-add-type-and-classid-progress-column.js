module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'CourseProgresses',
          'type',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'CourseProgresses',
          'classId',
          {
            type: Sequelize.UUID,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'CourseProgresses',
          'courseCohortId',
          {
            type: Sequelize.UUID,
            allowNull: true,
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('CourseProgresses', 'classId', {
          transaction: t,
        }),
        queryInterface.removeColumn('CourseProgresses', 'type', {
          transaction: t,
        }),
        queryInterface.removeColumn('CourseProgresses', 'courseCohortId', {
          transaction: t,
        }),
      ])
    ),
};
