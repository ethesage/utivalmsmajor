'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: DataTypes.UUID,
    classId: DataTypes.UUID,
    classResourcesId: DataTypes.UUID,
    resourceLink: DataTypes.STRING,
    isGraded: DataTypes.BOOLEAN,
    grade: DataTypes.INTEGER,
    gradedBy: DataTypes.STRING,
    submitDate: DataTypes.DATE,
    gradeDate: DataTypes.DATE
  }, {});
  Assignment.associate = function (models) {
    // associations can be defined here
    Assignment.belongsTo(models.Classes, {
      foreignKey: 'classId',
      onDelete: 'CASCADE'
    });
  };
  return Assignment;
};
