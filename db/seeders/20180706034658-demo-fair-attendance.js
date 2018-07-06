'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FairAttendance', [{
      id: 1,
      companyId: 1,
      paymentId: 1,
      fairId: 1,
      userCount: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      companyId: 2,
      paymentId: 2,
      fairId: 1,
      userCount: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FairAttendance', null, {});
  }
};
