import moment from 'moment';
import AccountNumber from '../helpers/accountNumber';
import { pool } from '../database';

/**
 * @exports account
 * @class Account
 */
class Account {
/**
  * @method create
  * @description Adds a user's bank account to the database
  * @param {object} data - The Request Body data
  * @param {object} req - The Request Object
  * @returns {object} JSON API Response
  */
  static create(data, req) {
    const queryText = `INSERT INTO accounts("accountNumber", "createdOn", owner,
      type, status, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING "accountNumber"::FLOAT, type, balance::FLOAT;`;
    const values = [AccountNumber.generateAccountNumber(), moment(new Date()),
      req.user.id, data.type, 'draft', parseFloat(data.initialDeposit, 10)];
    const response = pool.query(queryText, values);
    return response;
  }

  /**
  * @method updateStatus
  * @param {*} accountNumber - The accountNumber
  * @param{*} status - The  new status of the account
  * @returns {object} the account details
  */
  static updateStatus(accountNumber, status) {
    const query = 'UPDATE accounts SET status = $1 WHERE "accountNumber" = $2 RETURNING status;';
    const response = pool.query(query, [status, accountNumber]);
    return response;
  }

  /**
  * @method delete
  * @description Deletes an account
  * @param {*} accountNumber - The Response Object
  * @returns {object} JSON API Response
  */
  static delete(accountNumber) {
    const query = 'DELETE FROM accounts WHERE "accountNumber" = $1';
    const response = pool.query(query, [accountNumber]);
    return response;
  }

  /**
  * @method updateBalance
  * @description Updates the account balance
  * @param {*} accountNumber - The accountNumber
  * @param{*} balance - The  new balance of the account
  * @returns {object} the account details
  */
  static updateBalance(accountNumber, balance) {
    const query = 'UPDATE accounts SET balance = $1 WHERE "accountNumber" = $2 RETURNING *;';
    const response = pool.query(query, [balance, accountNumber]);
    return response;
  }

  /**
  * @method find
  * @description Finds and returns  account details that match the fiven account number
  * @param {*} accountNumber - The accountNumber
  * @returns {object} the account details
  */
  static find(accountNumber) {
    const query = 'SELECT * FROM accounts WHERE "accountNumber" = $1;';
    const response = pool.query(query, [accountNumber]);
    return response;
  }

  /**
  * @method getOne
  * @description Finds and returns  account details and user
  * details that match the fiven account number
  * @param {*} accountNumber - The accountNumber
  * @returns {object} the account details
  */
  static getOne(accountNumber) {
    const query = `
      SELECT users.id AS owner, accounts."createdOn", accounts."accountNumber"::FLOAT,
      users.email AS "ownerEmail", accounts.type, accounts.status,
      balance::FLOAT
      FROM accounts
      JOIN users ON accounts.owner = users.id 
      WHERE accounts."accountNumber" = $1`;
    const response = pool.query(query, [accountNumber]);
    return response;
  }

  /**
  * @method getAll
  * @description Finds and returns all accounts in the database
  * @returns {object} the account details
  */
  static getAll() {
    const query = `
      SELECT accounts.id, accounts."createdOn", accounts."accountNumber"::FLOAT,
      users.email AS "ownerEmail", users."firstName", users."lastName",
      accounts.type, accounts.status, accounts.balance::FLOAT
      FROM accounts
      JOIN users ON accounts."owner" = users.id
      ORDER BY accounts.id DESC`;
    const response = pool.query(query);
    return response;
  }

  /**
  * @method getActive
  * @description Finds and returns all accounts based on the specified status
  * @param {string} status - a string specifying the status of the account group to be fetched
  * @returns {object} the account details
  */
  static getByStatus(status) {
    const query = `
      SELECT accounts.id, accounts."createdOn", accounts."accountNumber"::FLOAT,
      users.email AS "ownerEmail", users."firstName", users."lastName", accounts.type, accounts.status, accounts.balance::FLOAT
      FROM accounts
      JOIN users ON accounts.owner = users.id
      WHERE accounts.status = $1
      ORDER BY accounts.id DESC`;
    const response = pool.query(query, [status]);
    return response;
  }

  /**
  * @method getAllForUser
  * @description Finds and returns all accounts owned by a particular user
  * @param {*} param - The value of the  parameter which will be used to fetch the user's data
  * @param {*} paramName - The name of the parameter to use for the query
  * @returns {object} the account details
  */
  static getAllForUser(param, paramName) {
    const query = `
      SELECT accounts.id, accounts."createdOn", accounts."accountNumber"::FLOAT,
      accounts.type, accounts.status, accounts.balance::FLOAT
      FROM accounts
      JOIN users ON accounts.owner = users.id 
      WHERE users.${paramName} = $1
      ORDER BY accounts.id ASC`;
    const response = pool.query(query, [param]);
    return response;
  }
}

export default Account;
