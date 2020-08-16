'use strict';

module.exports = (sequelize, DataTypes) => {
  const CourseDescription = sequelize.define('CourseDescription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    courseId: DataTypes.UUID,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    trainerId: DataTypes.UUID
  }, {});
  CourseDescription.associate = (models) => {
    // associations can be defined here
    CourseDescription.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
  };
  return CourseDescription;
};
