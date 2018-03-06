'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Referrals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      referrer: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentUsers',
          key: 'id'
        }
      },
      referral: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentUsers',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Referrals');
  }
};