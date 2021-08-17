/* eslint-env node */
require('dotenv').config();

module.exports = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};
