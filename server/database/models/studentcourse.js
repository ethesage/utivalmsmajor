'use strict';

module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: DataTypes.UUID,
    courseId: DataTypes.UUID,
    expiresAt: DataTypes.DATE,
    isCompleted: DataTypes.BOOLEAN,
    cohort: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      values: ['ongoing', 'finished']
    },
  }, {});
  StudentCourse.associate = (models) => {
    // associations can be defined here
    StudentCourse.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
  };
  return StudentCourse;
};
