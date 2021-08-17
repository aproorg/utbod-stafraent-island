'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        ALTER TABLE applications ALTER COLUMN city DROP NOT NULL;
      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        ALTER TABLE applications ALTER COLUMN city SET NOT NULL;
      COMMIT;
    `);
  },
};
