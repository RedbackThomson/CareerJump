'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Interviews', ['roomName'], {
      type: 'unique',
      name: 'interviews_roomName_unique'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Interviews',
      'interviews_roomName_unique');
  }
};
