const ENV = process.env.NODE_ENV || 'development';
const knex = require('knex');
const customConfig = ENV === 'production' ? { client: 'pg', connection: process.env.DATABASE_URL } : require('../knexfile');

const connection = knex(customConfig);

module.exports = connection;
