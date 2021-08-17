'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        ALTER TABLE children DROP CONSTRAINT children_application_id_fkey,
          ADD CONSTRAINT children_application_id_fkey
          FOREIGN KEY (application_id)
          REFERENCES applications(id)
          ON DELETE CASCADE;

        ALTER TABLE preferred_jobs DROP CONSTRAINT preferred_jobs_application_id_fkey,
          ADD CONSTRAINT preferred_jobs_application_id_fkey
          FOREIGN KEY (application_id)
          REFERENCES applications(id)
          ON DELETE CASCADE;
      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        ALTER TABLE children DROP CONSTRAINT children_application_id_fkey,
          ADD CONSTRAINT children_application_id_fkey
          FOREIGN KEY (application_id)
          REFERENCES applications(id);

        ALTER TABLE preferred_jobs DROP CONSTRAINT preferred_jobs_application_id_fkey,
          ADD CONSTRAINT preferred_jobs_application_id_fkey
          FOREIGN KEY (application_id)
          REFERENCES applications(id);
      COMMIT;
    `);
  },
};
