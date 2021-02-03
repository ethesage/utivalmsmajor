module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          "CohortTrainers",
          "cohortId",
          {
            type: Sequelize.UUID,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "CohortTrainers",
          "courseId",
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
        queryInterface.removeColumn("CohortTrainers", "cohortId", {
          transaction: t,
        }),
        queryInterface.removeColumn("CohortTrainers", "courseId", {
          transaction: t,
        }),
      ])
    ),
};
