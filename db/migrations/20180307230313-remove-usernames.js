'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('StudentUsers', 'username', {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('StudentUsers', 'username',
      Sequelize.STRING);
  }
};
