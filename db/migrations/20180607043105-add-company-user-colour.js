'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('CompanyUsers', 'colour',
      {
        type: Sequelize.STRING(6),
        defaultValue: '3F5EFB'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('CompanyUsers', 'colour', {});
  }
};
