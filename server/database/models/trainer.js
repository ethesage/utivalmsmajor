'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trainer = sequelize.define('Trainer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    courseId: DataTypes.UUID,
    userId: DataTypes.UUID,
    courseCohortId: DataTypes.UUID,
    cohortId: DataTypes.UUID
  }, {});
  Trainer.associate = (models) => {
    // associations can be defined here
    Trainer.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });

    Trainer.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Trainer.hasMany(models.Classes, {
      foreignKey: 'trainerId',
      onDelete: 'CASCADE'
    });

    Trainer.belongsTo(models.CourseCohort, {
      foreignKey: 'courseCohortId',
      onDelete: 'CASCADE'
    });

    Trainer.belongsTo(models.Cohort, {
      foreignKey: 'cohortId',
      onDelete: 'CASCADE'
    });
  };

  return Trainer;
};
