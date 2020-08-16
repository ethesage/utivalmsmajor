'use strict';

module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    fileType: DataTypes.STRING,
    fileSize: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  File.associate = () => {
    // associations can be defined here
  };
  return File;
};
