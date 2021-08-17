'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        CREATE TABLE applications (
          id UUID NOT NULL,
          name VARCHAR NOT NULL,
          address VARCHAR NOT NULL,
          postal_code INTEGER NOT NULL,
          city VARCHAR NOT NULL,
          national_id VARCHAR NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE,
          PRIMARY KEY(id)
        );

        CREATE TABLE children (
          application_id UUID,
          national_id VARCHAR,
          name VARCHAR NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE,
          PRIMARY KEY(application_id, national_id),
          FOREIGN KEY(application_id) REFERENCES applications(id)
        );

        CREATE TABLE preferred_jobs (
          application_id UUID,
          job VARCHAR,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE,
          PRIMARY KEY(application_id, job),
          FOREIGN KEY(application_id) REFERENCES applications(id)
        );
      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        DROP TABLE preferred_jobs;
        DROP TABLE children;
        DROP TABLE applications;
      COMMIT;
    `);
  },
};
