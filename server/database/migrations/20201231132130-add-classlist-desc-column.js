module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'Courses',
          'list_desc',
          {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: false,
          },
          { transaction: t }
        )
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('Courses', 'list_desc', {
          transaction: t,
        })
      ])
    ),
};
