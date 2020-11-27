'use strict';
module.exports = (sequelize, DataTypes) => {
  const TransactionHistory = sequelize.define('TransactionHistory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: DataTypes.STRING,
    name:DataTypes.STRING, 
    studentId: DataTypes.UUID,
    tnxRef: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    courseAmount: DataTypes.STRING,
    paidAmount: DataTypes.STRING,
    currency: DataTypes.STRING,
    courseCohortId: DataTypes.UUID,
    courseId: DataTypes.UUID,
    remainingBalance: DataTypes.STRING,
    status:DataTypes.STRING
  }, {});
  TransactionHistory.associate = function(models) {
    // associations can be defined here
  };
  return TransactionHistory;
};