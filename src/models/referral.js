'use strict';
module.exports = (sequelize, DataTypes) => {
  var Referral = sequelize.define('Referral', {
    referrer: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    referral: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Referral.associate = function() {

  };
  return Referral;
};
