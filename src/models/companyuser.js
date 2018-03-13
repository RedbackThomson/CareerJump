'use strict';
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
  CompanyUser.associate = function(models) {
    CompanyUser.belongsTo(models.Company, {as: 'company'});
  };
  return CompanyUser;
};
