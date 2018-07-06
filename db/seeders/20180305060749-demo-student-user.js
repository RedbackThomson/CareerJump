'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudentUsers', [{
      id: 1,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      email: 'redbackthomson@gmail.com',
      confirmed: true
    },{
      id: 2,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      email: 'student@example.com',
      confirmed: true
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentUsers', null, {});
  }
};
