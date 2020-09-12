module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'CourseCohorts',
          'folderId',
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
        queryInterface.removeColumn('CourseCohorts', 'folderId', {
          transaction: t,
        }),
      ])
    ),
};
