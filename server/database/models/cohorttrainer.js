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
    },
    {}
  );
  CohortTrainer.associate = (models) => {
    CohortTrainer.belongsTo(models.CourseCohort, {
      foreignKey: 'courseCohortId',
      onDelete: 'CASCADE',
    });

    CohortTrainer.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return CohortTrainer;
};
