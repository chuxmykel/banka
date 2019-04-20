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
  async updateBalance(accountNumber, balance) {
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
}

const account = new Account();
export default account;
