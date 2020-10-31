'use strict';

module.exports = (sequelize, DataTypes) => {
  const ClassResources = sequelize.define(
    'ClassResources',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      classId: DataTypes.UUID,
      type: DataTypes.STRING,
      link: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      dueDate: DataTypes.DATE,
      point: DataTypes.INTEGER,
    },
    {}
  );
  ClassResources.associate = (models) => {
    // associations can be defined here
    ClassResources.belongsTo(models.Classes, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });

    ClassResources.hasMany(models.Assignment, {
      foreignKey: 'classResourcesId',
      onDelete: 'CASCADE',
    });
  };
  return ClassResources;
};
