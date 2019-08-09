'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('recipes','id',{
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('recipes','id',{
      type: Sequelize.UUID
    });
  }
};
