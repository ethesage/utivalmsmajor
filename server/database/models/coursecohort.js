'use strict';

module.exports = (sequelize, DataTypes) => {
  const CourseCohort = sequelize.define('CourseCohort', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cohortId: DataTypes.UUID,
    courseId: DataTypes.UUID,
    expiresAt: DataTypes.DATE,
    dateRange: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      values: ['ongoing', 'finished']
    },
    totalStudent: DataTypes.INTEGER,
    totalClasses: DataTypes.INTEGER
  }, {});
  CourseCohort.associate = () => {
    // associations can be defined here
  };
  return CourseCohort;
};
