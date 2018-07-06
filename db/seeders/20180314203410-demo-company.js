'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [{
      id: 1,
      name: 'Example Company',
      description: 'Leading by Example',
      field: 'Computer Software',
      size: 'large',
      website: 'https://example.com',
      logo: 'https://s3-us-west-1.amazonaws.com/careerjump-staging/web-assets/example.png',
      colour: '3F5EFB',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Google',
      description: 'Don\'t be Evil',
      field: 'Computer Software',
      size: 'large',
      website: 'https://google.com',
      logo: 'https://s3-us-west-1.amazonaws.com/careerjump-staging/web-assets/google.png',
      colour: '6200EE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
