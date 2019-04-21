import moment from 'moment';
import AccountNumber from '../helpers/accountNumber';
import db from '../migrations/db';


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
  create(data, req) {
    const queryText = `INSERT INTO accounts(account_number, createdon, client_id,
      type, status, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING account_number, type, balance;`;
    const values = [AccountNumber.generateAccountNumber(), moment(new Date()),
      req.user.id, data.type, 'draft', parseFloat(data.initialDeposit, 10)];
    const response = db.query(queryText, values);
    return response;
  }

  /**
  * @method updateStatus
  * @param {*} accountNumber - The accountNumber
  * @param{*} status - The  new status of the account
  * @returns {object} the account details
  */
  async updateStatus(accountNumber, status) {
    const query = 'UPDATE accounts SET status = $1 WHERE account_number = $2 RETURNING *;';
    const response = db.query(query, [status, accountNumber]);
    return response;
  }

  /**
  * @method delete
  * @description Deletes an account
  * @param {*} accountNumber - The Response Object
  * @returns {object} JSON API Response
  */
  delete(accountNumber) {
    const query = 'DELETE FROM accounts WHERE account_number=$1';
    const response = db.query(query, [accountNumber]);
    return response;
  }

  /**
  * @method updateBalance
  * @description Updates the account balance
  * @param {*} accountNumber - The accountNumber
  * @param{*} balance - The  new balance of the account
  * @returns {object} the account details
  */
  updateBalance(accountNumber, balance) {
    const query = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 returning *;';
    const response = db.query(query, [balance, accountNumber]);
    return response;
  }

  /**
  * @method find
  * @description Finds and returns  account details that match the fiven account number
  * @param {*} accountNumber - The accountNumber
  * @returns {object} the account details
  */
  find(accountNumber) {
    const query = 'SELECT * FROM accounts WHERE account_number=$1;';
    const response = db.query(query, [accountNumber]);
    return response;
  }

  /**
  * @method getOne
  * @description Finds and returns  account details and user
  * details that match the fiven account number
  * @param {*} accountNumber - The accountNumber
  * @returns {object} the account details
  */
  getOne(accountNumber) {
    const query = `
      SELECT users.id AS owner, accounts.createdon, accounts.account_number AS accountnumber,
      users.email AS ownerEmail, accounts.type, accounts.status,
      balance
      FROM accounts
      JOIN users ON accounts.client_id = users.id 
      WHERE accounts.account_number = $1`;
    const response = db.query(query, [accountNumber]);
    return response;
  }

  /**
  * @method getAll
  * @description Finds and returns all accounts owned by a particular user
  * @param {*} email - The email of the user who;'s account details should be fetched
  * @returns {object} the account details
  */
  getAll(email) {
    const query = `
      SELECT accounts.createdon, accounts.account_number AS accountnumber,
      accounts.type, accounts.status, accounts.balance
      FROM accounts
      JOIN users ON accounts.client_id = users.id 
      WHERE users.email = $1
      ORDER BY accounts.id ASC`;
    const response = db.query(query, [email]);
    return response;
  }
}

const account = new Account();
export default account;
