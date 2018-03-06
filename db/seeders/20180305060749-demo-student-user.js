'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudentUsers', [{
      username: 'RedbackThomson',
      password: 'password',
      email: 'redbackthomson@gmail.com'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('StudentUsers', null, {})
  }
};
