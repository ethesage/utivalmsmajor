'use strict';

module.exports = (sequelize, DataTypes) => {
  const CourseProgress = sequelize.define('CourseProgress', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    courseId: DataTypes.UUID,
    userId: DataTypes.UUID,
    progress: DataTypes.INTEGER
  }, {});
  CourseProgress.associate = (models) => {
    // associations can be defined here
    CourseProgress.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
  };
  return CourseProgress;
};
