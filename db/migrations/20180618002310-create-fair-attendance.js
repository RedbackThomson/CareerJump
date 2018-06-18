'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FairAttendance', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fairId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Fairs',
          key: 'id'
        }
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id'
        }
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CompanyPayments',
          key: 'id'
        }
      },
      userCount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FairAttendance');
  }
};
