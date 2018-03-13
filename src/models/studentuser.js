'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var StudentUser = sequelize.define('StudentUser', {
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
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      },
      beforeUpdate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      }
    }
  });
  StudentUser.associate = function(models) {
    StudentUser.hasOne(models.StudentProfile, {as: 'profile', foreignKey: 'userId'});
  };
  StudentUser.prototype.validPassword = function (testPassword) {
    return new Promise((resolve, reject) => {
      return bcrypt.compare(testPassword, this.password, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  };

  return StudentUser;
};
