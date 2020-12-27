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
      started: DataTypes.BOOLEAN,
    },
    {}
  );
  Classes.associate = (models) => {
    // associations can be defined here
    Classes.hasMany(models.CohortClassDays, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });

    Classes.hasMany(models.CohortClassVideo, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });

    Classes.hasMany(models.ClassResources, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });
    Classes.hasOne(models.CohortTrainer, {
      foreignKey: 'classId',
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
