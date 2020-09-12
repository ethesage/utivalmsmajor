'use strict';
module.exports = (sequelize, DataTypes) => {
  const AssignmentComment = sequelize.define('AssignmentComment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    comment: DataTypes.TEXT,
    assignmentId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {});
  AssignmentComment.associate = (models) => {
    AssignmentComment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return AssignmentComment;
};