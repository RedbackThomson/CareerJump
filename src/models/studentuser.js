'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentUser = sequelize.define('StudentUser', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      isEmail: true,
      type: DataTypes.STRING
    },
    confirmed: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    deleted: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  StudentUser.associate = function(models) {
    StudentUser.hasOne(models.StudentProfile, {as: 'user'});
  };
  return StudentUser;
};
