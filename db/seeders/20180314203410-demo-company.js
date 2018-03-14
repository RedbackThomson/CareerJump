'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [{
      name: 'Example Company',
      description: 'Leading by Example',
      field: 'Computer Software',
      size: 'large',
      website: 'https://example.com',
      logo: 'https://s3-us-west-1.amazonaws.com/careerjump-staging/web-assets/example.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
