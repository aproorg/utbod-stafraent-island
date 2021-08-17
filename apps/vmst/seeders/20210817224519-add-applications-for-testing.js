'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'applications',
      [
        {
          id: 'ef83e1da-7be2-44da-910b-9557d4ad03af',
          name: 'Jóna Jónsdóttir',
          address: 'Andesgrund',
          postal_code: 200,
          city: 'Reykjavík',
          national_id: '0101938189',
        },
      ],
      {},
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('applications', null, {});
  },
};
