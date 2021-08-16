'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE applications (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          national_id VARCHAR NOT NULL,
          applicants_circumstances VARCHAR NOT NULL,
          personal_discount_ratio DECIMAL NOT NULL,
          personal_discount INTEGER NOT NULL,
          income_tax_step1 DECIMAL NOT NULL,
          income_tax_step2 DECIMAL NOT NULL,
          income INTEGER NOT NULL,
          retirement_or_disability_payment_from_tryggingarstofnun INTEGER NOT NULL,
          retirement_and_disability_payment_from_pension_funds INTEGER NOT NULL,
          union_ratio DECIMAL NOT NULL,
          working_ratio DECIMAL NOT NULL,
          pension_fund_ratio DECIMAL NOT NULL,
          additional_pension_fund_ratio DECIMAL NOT NULL,
          parental_leave BOOLEAN NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE
        );
      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      DROP TABLE applications;
    `);
  },
};
