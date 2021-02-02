module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'StudentCourses',
          'courseAmount',
          {
            type: Sequelize.BIGINT,
            allowNull: true,
            // defaultValue: 'full',
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'StudentCourses',
          'amountPaid',
          {
            type: Sequelize.BIGINT,
            allowNull: true,
            // defaultValue: 'full',
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'StudentCourses',
          'paymentComplete',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            // defaultValue: 'full',
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('StudentCourses', 'amountPaid', {
          transaction: t,
        }),
        queryInterface.removeColumn('StudentCourses', 'paymentComplete', {
          transaction: t,
        }),
        queryInterface.removeColumn('StudentCourses', 'courseAmount', {
          transaction: t,
        }),
        
      ])
    ),
};
