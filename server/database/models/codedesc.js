const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class codeDesc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  codeDesc.init(
    {
      seq: DataTypes.INTEGER,
      code: DataTypes.STRING,
      desc: DataTypes.STRING,
      resource: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'codeDesc',
    }
  );
  return codeDesc;
};
