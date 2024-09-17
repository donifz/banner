'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('price', 'currentPrice', {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // значение по умолчанию, если нужно
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('price', 'currentPrice');

    /**
     * Add reverting commands here.
     *
     * Example:
     */
  },
};
