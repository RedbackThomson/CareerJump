'use strict';
module.exports = (sequelize, DataTypes) => {
  var Fair = sequelize.define('Fair', {
    name: DataTypes.STRING,
    fairDate: DataTypes.DATE,
    description: DataTypes.STRING
  }, {});
  Fair.associate = function(models) {
    // associations can be defined here
  };
  return Fair;
};
