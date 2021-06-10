module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'CourseCohorts',
          'whatsAppLink',
          {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.removeColumn('CourseCohorts', 'folderId', {
          transaction: t,
        }),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('CourseCohorts', 'whatsAppLink', {
          transaction: t,
        }),
        queryInterface.addColumn('CourseCohorts', 'folderId', {
          transaction: t,
        }),
      ])
    ),
};
