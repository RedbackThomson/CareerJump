'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CompanyUsers', [{
      companyId: 1,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      email: 'employee@example.com',
      firstName: 'Model',
      lastName: 'Employee',
      jobTitle: 'Recruiter',
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CompanyUsers', null, {});
  }
};
