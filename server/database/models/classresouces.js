'use strict';

module.exports = (sequelize, DataTypes) => {
  const ClassResouces = sequelize.define('ClassResouces', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    classId: DataTypes.UUID,
    type: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  ClassResouces.associate = (models) => {
    // associations can be defined here
    ClassResouces.belongsTo(models.Classes, {
      foreignKey: 'classId',
      onDelete: 'CASCADE'
    });
  };
  return ClassResouces;
};
