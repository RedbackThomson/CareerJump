'use strict';
module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    field: DataTypes.STRING,
    size: DataTypes.ENUM('startup', 'large'),
    website: DataTypes.STRING,
    logo: DataTypes.STRING,
    colour: DataTypes.CHAR(6)
  }, {});
  Company.associate = function(models) {

  };
  return Company;
};
