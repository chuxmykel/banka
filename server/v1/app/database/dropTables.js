import dbClient from './index';

const queryString = 'DROP TABLE IF EXISTS users, accounts, transactions CASCADE';

dbClient.query(queryString);
