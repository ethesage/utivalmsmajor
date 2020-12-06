module.exports = (sequelize, DataTypes) => {
  const CohortClassDays = sequelize.define(
    'CohortClassDays',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      classId: DataTypes.UUID,
      courseCohortId: DataTypes.UUID,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
    },
    {}
  );
  CohortClassDays.associate = (models) => {
    // associations can be defined here
    CohortClassDays.belongsTo(models.CourseCohort, {
      foreignKey: 'courseCohortId',
      onDelete: 'CASCADE',
    });
  };
  return CohortClassDays;
};
