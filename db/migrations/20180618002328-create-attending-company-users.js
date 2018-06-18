'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AttendingCompanyUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attendanceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'FairAttendance',
          key: 'id'
        }
      },
      companyUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CompanyUsers',
          key: 'id'
        }
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
    return queryInterface.dropTable('AttendingCompanyUsers');
  }
};
