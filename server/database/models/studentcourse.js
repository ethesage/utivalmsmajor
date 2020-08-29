'use strict';

module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: DataTypes.UUID,
    courseCohortId: DataTypes.UUID,
    expiresAt: DataTypes.DATE,
    isCompleted: DataTypes.BOOLEAN,
    cohortId: DataTypes.UUID,
    courseId: DataTypes.UUID,
    status: {
      type: DataTypes.STRING,
      values: ['ongoing', 'finished']
    },
  }, {});
  StudentCourse.associate = (models) => {
    // associations can be defined here
    StudentCourse.belongsTo(models.CourseCohort, {
      foreignKey: 'courseCohortId',
      onDelete: 'CASCADE'
    });

    StudentCourse.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });

    StudentCourse.belongsTo(models.Cohort, {
      foreignKey: 'cohortId',
      onDelete: 'CASCADE'
    });

    StudentCourse.belongsTo(models.User, {
      // as: 'userId',
      foreignKey: 'studentId',
      // onDelete: 'CASCADE'
    });
    // StudentCourse.belongsTo(models.Classes, {
    //   // as: 'userId',
    //   foreignKey: 'courseCohortId',
    //   // onDelete: 'CASCADE'
    // });
  };
  return StudentCourse;
};
