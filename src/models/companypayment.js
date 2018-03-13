'use strict';
module.exports = (sequelize, DataTypes) => {
  var CompanyPayment = sequelize.define('CompanyPayment', {
    amount: DataTypes.DOUBLE,
    paymentDate: DataTypes.DATE
  }, {});
  CompanyPayment.associate = function(models) {
    CompanyPayment.belongsTo(models.Company, {as: 'company'});
    CompanyPayment.belongsTo(models.Fair, {as: 'fair'});
  };
  return CompanyPayment;
};
