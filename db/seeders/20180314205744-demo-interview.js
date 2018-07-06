'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Interviews', [{
      id: 1,
      companyUserId: 1,
      studentUserId: 1,
      fairId: 1,
      scheduled: new Date(2019, 7, 1, 12, 0, 0),
      roomName: 'ZXhhbXBsZXJvb20',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      companyUserId: 3,
      studentUserId: 1,
      fairId: 1,
      scheduled: new Date(2019, 7, 1, 12, 30, 0),
      roomName: 'ZXhhbXBsZXJvb21',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      companyUserId: 2,
      studentUserId: 2,
      fairId: 1,
      scheduled: new Date(2019, 7, 1, 12, 0, 0),
      roomName: 'ZXhhbXBsZXJvb22',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Interviews', null, {});
  }
};
