'use strict';

module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define('Classes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    courseCohortId: DataTypes.UUID,
    courseId: DataTypes.UUID,
    trainerId: DataTypes.UUID,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.STRING,
    dateRange: DataTypes.STRING
  }, {});
  Classes.associate = () => {
    // associations can be defined here
  };
  return Classes;
};
