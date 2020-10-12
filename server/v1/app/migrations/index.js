import debug from 'debug';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const log = debug('dev');

export const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
});


pool.on('connect', () => {
  log('connected to the db');
});

pool.on('remove', () => {
  log('client removed');
  process.exit(0);
});

/**
  * @function query
  * @description queries the db with the specified string
  * @param {string} queryString - the query string
  * @returns {*} nothing
  */
const query = async (queryString) => {
  try {
    await pool.query(queryString);
    pool.end();
  } catch (err) {
    log(err);
    pool.end();
  }
};

export default query;
