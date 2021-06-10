module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Assignments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    studentId: {
      type: Sequelize.UUID
    },
    classId: {
      type: Sequelize.UUID
    },
    classResourcesId: {
      type: Sequelize.UUID
    },
    resourceLink: {
      type: Sequelize.STRING
    },
    isGraded: {
      type: Sequelize.BOOLEAN
    },
    grade: {
      type: Sequelize.INTEGER
    },
    gradedBy: {
      type: Sequelize.STRING
    },
    submitDate: {
      type: Sequelize.DATE
    },
    gradeDate: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Assignments')
};
