module.exports = (sequelize, DataTypes) => {
  const CohortTrainer = sequelize.define(
    'CohortTrainer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      classId: DataTypes.UUID,
      courseCohortId: DataTypes.UUID,
      cohortId: DataTypes.UUID,
      courseId: DataTypes.UUID,
    },
    {}
  );
  CohortTrainer.associate = (models) => {
    CohortTrainer.belongsTo(models.Classes, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });

    CohortTrainer.belongsTo(models.CourseCohort, {
      foreignKey: 'courseCohortId',
      onDelete: 'CASCADE',
    });

    CohortTrainer.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    CohortTrainer.belongsTo(models.Cohort, {
      foreignKey: 'cohortId',
      onDelete: 'CASCADE',
    });

    CohortTrainer.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
  };
  return CohortTrainer;
};
