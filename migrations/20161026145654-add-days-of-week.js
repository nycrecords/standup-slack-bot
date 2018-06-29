'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'channels',
      'monday',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ).then(() => queryInterface.addColumn(
      'channels',
      'tuesday',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    )).then(() => queryInterface.addColumn(
      'channels',
      'wednesday',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    )).then(() => queryInterface.addColumn(
      'channels',
      'thursday',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    )).then(() => queryInterface.addColumn(
      'channels',
      'friday',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ));
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
