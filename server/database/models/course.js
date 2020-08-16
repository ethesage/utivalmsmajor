module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.STRING,
    level: DataTypes.STRING,
    extLink: DataTypes.STRING,
    value: DataTypes.STRING,
    cost: DataTypes.BIGINT,
    learnMore: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    trainerId: DataTypes.UUID,
    totalClasses: DataTypes.INTEGER,
    totalStudents: DataTypes.INTEGER,
    coupon: DataTypes.STRING,
  }, {});
  Course.associate = (models) => {
    // associations can be defined here
    Course.hasMany(models.CourseDescription, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
    Course.hasMany(models.StudentCourse, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
    Course.hasMany(models.CourseProgress, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });

    // Course.hasMany(models.Cohort, {
    //   foreignKey: 'courseId',
    //   onDelete: 'CASCADE'
    // });
  };
  return Course;
};
