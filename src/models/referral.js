'use strict';
module.exports = (sequelize, DataTypes) => {
  var Referral = sequelize.define('Referral', {

  }, {});
  Referral.associate = function(models) {
    Referral.belongsTo(models.StudentUser, {as: 'referrer'});
    Referral.belongsTo(models.StudentUser, {as: 'referral'});
  };
  return Referral;
};
