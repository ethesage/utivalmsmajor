module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CohortClassVideos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      classId: {
        type: Sequelize.UUID,
      },
      courseCohortId: {
        type: Sequelize.UUID,
      },
      link: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('CohortClassVideos'),
};
