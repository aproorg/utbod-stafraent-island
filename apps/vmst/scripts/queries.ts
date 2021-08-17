import { Sequelize, QueryTypes } from 'sequelize';
import { database, host, password, username } from '../sequelize.config.js';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});
const getAll = async () => {
  const results = await sequelize.query(
    'SELECT * FROM applications ORDER BY created_at DESC LIMIT 1',
    {
      logging: console.log,
      plain: false,
      raw: true,
      type: QueryTypes.SELECT,
    },
  );
  console.log(results);
};
(async () => {
  setInterval(() => {
    getAll();
  }, 1000);
})();
