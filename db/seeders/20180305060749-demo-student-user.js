'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudentUsers', [{
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      email: 'redbackthomson@gmail.com'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentUsers', null, {});
  }
};
