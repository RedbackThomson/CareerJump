'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Interviews', [{
      companyUserId: 1,
      studentUserId: 1,
      fairId: 1,
      scheduled: new Date(2019, 7, 1, 12, 0, 0),
      roomName: 'ZXhhbXBsZXJvb20',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Interviews', null, {});
  }
};
