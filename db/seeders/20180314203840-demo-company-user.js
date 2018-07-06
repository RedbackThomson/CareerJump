'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CompanyUsers', [{
      id: 1,
      companyId: 1,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      email: 'employee@example.com',
      firstName: 'George',
      lastName: 'Clooney',
      jobTitle: 'Hiring Manager',
      admin: true,
      colour: '3F5EFB',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      companyId: 1,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      email: 'employee2@example.com',
      firstName: 'David',
      lastName: 'Stevens',
      jobTitle: 'Recruiter',
      admin: false,
      colour: 'B91FC1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      companyId: 2,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      email: 'employee@google.com',
      firstName: 'Sundar',
      lastName: 'Pichai',
      jobTitle: 'CEO',
      admin: true,
      colour: '6200EE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CompanyUsers', null, {});
  }
};
