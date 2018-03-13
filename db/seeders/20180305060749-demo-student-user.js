'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudentUsers', [{
      password: 'password',
      email: 'redbackthomson@gmail.com'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('StudentUsers', null, {})
  }
};
