'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentProfile = sequelize.define('StudentProfile', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    university: {
      allowNull: false,
      type: DataTypes.STRING
    },
    major: {
      allowNull: false,
      type: DataTypes.STRING
    },
    gpa: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    gradDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    sponsorship: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    workHistory: DataTypes.ARRAY(DataTypes.TEXT),
    preference: {
      type: DataTypes.ENUM('startup', 'large')
    },
    position: {
      allowNull: false,
      type: DataTypes.ENUM('fulltime', 'internship')
    },
    skills: DataTypes.ARRAY(DataTypes.TEXT),
    linkedIn: {
      isUrl: true,
      type: DataTypes.STRING
    },
    resume: {
      allowNull: false,
      isUrl: true,
      type: DataTypes.STRING
    },
  }, {});
  StudentProfile.associate = function(models) {
    StudentProfile.belongsTo(models.StudentUser, {as: 'user'});
  };
  return StudentProfile;
};
