'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'preferred_jobs',
      [
        {
          application_id: 'ef83e1da-7be2-44da-910b-9557d4ad03af',
          job: 'Software Developer',
        },
        {
          application_id: 'ef83e1da-7be2-44da-910b-9557d4ad03af',
          job: 'Team Manager',
        },
      ],
      {},
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('preferred_jobs', null, {});
  },
};
