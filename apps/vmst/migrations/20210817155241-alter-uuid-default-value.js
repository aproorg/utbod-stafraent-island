'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        ALTER TABLE applications ALTER COLUMN id DROP DEFAULT;
      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        ALTER TABLE applications ALTER COLUMN id SET DEFAULT uuid_generate_v4();
      COMMIT;
    `);
  },
};
