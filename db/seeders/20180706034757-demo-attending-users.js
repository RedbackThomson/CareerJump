'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AttendingCompanyUsers', [{
      id: 1,
      attendanceId: 1,
      companyUserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      attendanceId: 1,
      companyUserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      attendanceId: 2,
      companyUserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AttendingCompanyUsers', null, {});
  }
};
