'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'children',
      [
        {
          application_id: 'ef83e1da-7be2-44da-910b-9557d4ad03af',
          name: 'Jón Jónsson',
          national_id: '0101939159',
        },
      ],
      {},
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('children', null, {});
  },
};
