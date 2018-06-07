'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var CompanyUser = sequelize.define('CompanyUser', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    email: {
      isEmail: true,
      type: DataTypes.STRING
    },
    colour: DataTypes.CHAR(6)
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
  CompanyUser.associate = function(models) {
    CompanyUser.belongsTo(models.Company, {as: 'company'});
  };
  CompanyUser.prototype.validPassword = function (testPassword) {
    return new Promise((resolve, reject) => {
      return bcrypt.compare(testPassword, this.password, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  };
  return CompanyUser;
};
