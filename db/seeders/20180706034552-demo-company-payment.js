'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CompanyPayments', [{
      id: 1,
      companyId: 1,
      amount: 3.50,
      fairId: 1,
      paymentDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      companyId: 2,
      amount: 4.50,
      fairId: 1,
      paymentDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CompanyPayments', null, {});
  }
};
