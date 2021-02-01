module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'CourseCohorts',
          'paymentType',
          {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'full',
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('CourseCohorts', 'paymentType', {
          transaction: t,
        }),
      ])
    ),
};
