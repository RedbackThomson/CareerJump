'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentUsers',
          key: 'id'
        }
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      university: {
        allowNull: false,
        type: Sequelize.STRING
      },
      major: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gpa: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      gradDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sponsorship: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      workHistory: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      preference: {
        type: Sequelize.ENUM('startup', 'large')
      },
      position: {
        allowNull: false,
        type: Sequelize.ENUM('fulltime', 'internship')
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      linkedIn: {
        type: Sequelize.STRING,
        isUrl: true
      },
      resume: {
        allowNull: false,
        type: Sequelize.STRING,
        isUrl: true
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
    return queryInterface.dropTable('StudentProfiles');
  }
};