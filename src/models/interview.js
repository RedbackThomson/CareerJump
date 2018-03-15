'use strict';
module.exports = (sequelize, DataTypes) => {
  var Interview = sequelize.define('Interview', {
    scheduled: {
      allowNull: false,
      type: DataTypes.DATE
    },
    roomName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {});
  Interview.associate = function(models) {
    Interview.belongsTo(models.CompanyUser, {as: 'companyUser'});
    Interview.belongsTo(models.StudentUser, {as: 'studentUser'});
    Interview.belongsTo(models.Fair, {as: 'fair'});
  };
  return Interview;
};
