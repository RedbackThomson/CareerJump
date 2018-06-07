'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Companies', 'colour',
      {
        type: Sequelize.STRING(6),
        defaultValue: '3F5EFB'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Companies', 'colour', {});
  }
};
