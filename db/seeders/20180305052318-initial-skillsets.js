'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Skillsets', [{
      name: 'Full Stack (Web)'
    }, {
      name: 'Frontend (Web)'
    }, {
      name: 'Backend (Web)'
    }, {
      name: 'Data Science'
    }, {
      name: 'Mobile Development'
    }, {
      name: 'Embedded Systems'
    }, {
      name: 'Distributed Systems'
    }, {
      name: 'Security'
    }, {
      name: 'IT/Site Reliability/DevOps'
    }, {
      name: 'Quality Assurance'
    }, {
      name: 'Systems & Networking'
    }, {
      name: 'Databases'
    }, {
      name: 'Product/UX Design'
    }, {
      name: 'Product Management'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Skillsets', null, {});
  }
};
