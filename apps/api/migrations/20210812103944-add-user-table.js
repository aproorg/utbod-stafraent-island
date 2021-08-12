'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        CREATE TABLE users (
          id serial PRIMARY KEY,
          first_name VARCHAR ( 50 ) NOT NULL,
          last_name VARCHAR ( 50 ) NOT NULL,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE
        );

        INSERT INTO users (first_name, last_name, is_active, created_at)  VALUES('Davíð Guðni', 'Halldórsson', 't', '2021-08-12T11:20:52.089Z');
        INSERT INTO users (first_name, last_name, is_active, created_at)  VALUES('Petar', 'Shomov', 't', '2021-08-12T11:20:52.089Z');
        INSERT INTO users (first_name, last_name, is_active, created_at)  VALUES('Sindri', 'Guðmundsson', 't', '2021-08-12T11:20:52.089Z');
      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      DROP TABLE users;
    `);
  },
};
