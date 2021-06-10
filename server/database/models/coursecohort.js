'use strict';

module.exports = (sequelize, DataTypes) => {
  const CourseCohort = sequelize.define(
    'CourseCohort',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cohortId: DataTypes.UUID,
      courseId: DataTypes.UUID,
      expiresAt: DataTypes.DATE,
      dateRange: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        values: ['ongoing', 'finished'],
      },
      totalStudent: DataTypes.INTEGER,
      totalClasses: DataTypes.INTEGER,
      whatsAppLink: DataTypes.TEXT,
      progress: DataTypes.INTEGER,
      paymentType: DataTypes.STRING,
    },
    {}
  );
  CourseCohort.associate = (models) => {
    // associations can be defined here
    CourseCohort.hasMany(models.StudentCourse, {
      foreignKey: 'courseCohortId',
      onDelete: 'CASCADE',
      hooks: true,
    });

    CourseCohort.hasMany(models.CohortTrainer, {
      foreignKey: 'courseCohortId',
      onDelete: 'CASCADE',
      hooks: true,
    });

    // CourseCohort.hasMany(models.CohortClassDays, {
    //   foreignKey: 'courseCohortId',
    //   onDelete: 'CASCADE',

    // });

    CourseCohort.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
      hooks: true,
    });

    CourseCohort.belongsTo(models.Cohort, {
      foreignKey: 'cohortId',
    });
  };
  return CourseCohort;
};
