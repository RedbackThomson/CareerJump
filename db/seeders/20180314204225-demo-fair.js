'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Fairs', [{
      id: 1,
      name: 'CareerJump 1.0',
      alias: 'careerjump1',
      fairDate: new Date(2019, 7, 1),
      description: 'Pilot CareerJump Fair',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Fairs', null, {});
  }
};
