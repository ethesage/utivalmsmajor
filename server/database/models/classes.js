'use strict';

module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define(
    'Classes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courseCohortId: DataTypes.UUID,
      courseId: DataTypes.UUID,
      trainerId: DataTypes.UUID,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      link: DataTypes.STRING,
      dateRange: DataTypes.STRING,
    },
    {}
  );
  Classes.associate = (models) => {
    // associations can be defined here
    Classes.hasMany(models.ClassDays, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });
    Classes.hasMany(models.ClassResources, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });
    Classes.belongsTo(models.Trainer, {
      foreignKey: 'trainerId',
      onDelete: 'CASCADE',
    });
    Classes.hasMany(models.Assignment, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });
    // Classes.hasMany(models.StudentCourse, {
    //   foreignKey: 'courseCohortId',
    //   onDelete: 'CASCADE'
    // });
  };
  return Classes;
};
