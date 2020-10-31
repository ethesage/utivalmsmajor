import { v4 as uuid } from 'uuid';
import helpers from '../../helpers';

const { hashPassword } = helpers;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      profilePic: DataTypes.STRING,
      emailNotify: DataTypes.BOOLEAN,
      inAppNotify: DataTypes.BOOLEAN,
      company: DataTypes.STRING,
      occupation: DataTypes.STRING,
      region: DataTypes.STRING,
      country: DataTypes.STRING,
      gender: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      bio: DataTypes.TEXT,
      firstentry: DataTypes.BOOLEAN,
      linkedin: DataTypes.STRING,
      updated: DataTypes.BOOLEAN,
      verifiedPayment: DataTypes.BOOLEAN,
      verifiedEmail: DataTypes.BOOLEAN,
      byadmin: DataTypes.BOOLEAN,
    },
    {
      getterMethods: {
        uuid_slug() {
          return uuid();
        },
      },
      hooks: {
        beforeCreate: async (user) => {
          user.password = await hashPassword(user.password);
        },
        // beforeUpdate: async (user) => {
        //   user.password = await hashPassword(user.password);
        // },
      },
    }
  );

  User.beforeCreate((user) => {
    user.id = uuid();
  });

  User.associate = (models) => {
    User.hasMany(models.Trainer, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.StudentCourse, {
      as: 'userId',
      foreignKey: 'studentId',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.AssignmentComment, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Assignment, {
      foreignKey: 'studentId',
      onDelete: 'CASCADE',
    });
  };

  User.prototype.userResponse = function userResponse() {
    const userData = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      company: this.company,
      region: this.region,
      gender: this.gender,
      country: this.country,
      occupation: this.occupation,
      profilePic: this.profilePic,
      phoneNumber: this.phoneNumber,
      linkedin: this.linkedin,
      updated: this.updated,
      firstentry: this.firstentry,
      verifiedEmail: this.verifiedEmail,
      verifiedPayment: this.verifiedPayment,
      bio: this.bio,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return userData;
  };
  return User;
};
