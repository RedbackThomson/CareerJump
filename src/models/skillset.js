'use strict';
module.exports = (sequelize, DataTypes) => {
  var Skillset = sequelize.define('Skillset', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  });
  Skillset.associate = function() {
    // associations can be defined here
  };
  return Skillset;
};
