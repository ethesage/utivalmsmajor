// "use strict";
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("AssignmentComments", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    comment: {
      type: Sequelize.TEXT,
    },
    assignmentId: {
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.UUID,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable("AssignmentComments"),
};
