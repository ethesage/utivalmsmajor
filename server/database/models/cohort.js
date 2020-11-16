'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define(
    'Cohort',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cohort: DataTypes.STRING,
      totalCourse: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        values: ['ongoing', 'finished'],
      },
    },
    {}
  );
  Cohort.associate = (models) => {
    // associations can be defined here
    Cohort.hasMany(models.StudentCourse, {
      foreignKey: 'cohortId',
      onDelete: 'CASCADE',
    });
    Cohort.hasMany(models.Trainer, {
      foreignKey: 'cohortId',
      onDelete: 'CASCADE',
    });
    Cohort.hasMany(models.CourseCohort, {
      foreignKey: 'cohortId',
      onDelete: 'CASCADE',
    });
  };
  return Cohort;
};
