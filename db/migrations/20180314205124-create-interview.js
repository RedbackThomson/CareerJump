'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Interviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CompanyUsers',
          key: 'id'
        }
      },
      studentUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentUsers',
          key: 'id'
        }
      },
      fairId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Fairs',
          key: 'id'
        }
      },
      scheduled: {
        allowNull: false,
        type: Sequelize.DATE
      },
      roomName: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Interviews');
  }
};
