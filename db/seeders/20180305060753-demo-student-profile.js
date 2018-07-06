'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudentProfiles', [{
      id: 1,
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
    },{
      id: 2,
      userId: 2,
      firstName: 'Example',
      lastName: 'Student',
      university: 'Example University',
      major: 'Computer Science',
      gpa: 4.0,
      gradDate: '2019-06-01',
      sponsorship: false,
      workHistory: ['Google'],
      preference: 'large',
      position: 'fulltime',
      skills: [4, 5, 6],
      linkedIn: 'https://example.com/linkedin',
      resume: 'https://example.com/resume'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentProfiles', null, {});
  }
};
