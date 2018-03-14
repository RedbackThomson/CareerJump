'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudentProfiles', [{
      userId: 1,
      firstName: 'Redback',
      lastName: 'Thomson',
      university: 'The University of California, San Diego',
      major: 'Computer Science',
      gpa: 3.66,
      gradDate: '2018-06-01',
      sponsorship: true,
      workHistory: ['Amazon'],
      preference: 'startup',
      position: 'internship',
      skills: [1, 2, 3],
      linkedIn: 'https://example.com/linkedin',
      resume: 'https://example.com/resume'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentProfiles', null, {});
  }
};
