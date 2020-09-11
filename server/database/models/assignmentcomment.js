'use strict';
module.exports = (sequelize, DataTypes) => {
  const AssignmentComment = sequelize.define('AssignmentComment', {
    comment: DataTypes.TEXT,
    assignmentId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {});
  AssignmentComment.associate = function(models) {
    // associations can be defined here
  };
  return AssignmentComment;
};