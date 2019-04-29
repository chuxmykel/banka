import debug from 'debug';
import pool from './db';

const log = debug('dev');
/**
  * @function query
  * @description queries the db with the specified string
  * @param {string} queryString - the query string
  * @returns {*} nothing
  */
const query = async (queryString) => {
  pool.on('connect', () => {
    log('connected to the db');
  });
  pool.query(queryString)
    .then((res) => {
      log(res);
      pool.end();
    })
    .catch((err) => {
      log(err);
      pool.end();
    });

  pool.on('remove', () => {
    log('client removed');
    process.exit(0);
  });
};

export default query;
