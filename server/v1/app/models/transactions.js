import moment from 'moment';
import db from '../migrations/db';

/**
 * @exports transaction
 * @class Transaction
 */
class Transaction {
/**
  * @method create
  * @description Adds a transaction to the database
  * @param {object} req - The Request Object
  * @param {object} account - An object  containing the account details
  * @param {string} type - A string representing the type of transaction
  * @returns {object} JSON API Response
  */
  create(req, account, type) {
    const queryText = `INSERT INTO transactions(createdon, type,
      account_number, cashier, amount, old_balance, new_balance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const newBalance = Transaction.getBalance(account.balance, req.body.amount, type);
    const values = [moment(new Date()), type, accountNumber,
      req.user.id, parseFloat(req.body.amount), account.balance, newBalance];

    const response = db.query(queryText, values);
    return response;
  }

  /**
  * @method getBalance
  * @param {object} accountBalance - The previous account balance
  * @param {object} amount - The transaction amount
  * @param {string} type - A string representing the type of transaction
  * @returns {object} JSON API Response
  */
  static getBalance(accountBalance, amount, type) {
    const credit = parseFloat((parseFloat(accountBalance) + parseFloat(amount)).toFixed(2));
    const debit = parseFloat((parseFloat(accountBalance) - parseFloat(amount)).toFixed(2));
    return type === 'credit' ? credit : debit;
  }

  /**
  * @method getAllHistory
  * @description Fetches all transactions on a particular account number
  * @param {object} req - The request object
  * @param {object} accountNumber - The account number
  * @returns {object} JSON API Response
  */
  getAllHistory(req, accountNumber) {
    const queryText = `
      SELECT transactions.id AS transactionId, transactions.createdon AS createdOn,
      transactions.type, transactions.account_number AS accountNumber, amount,
      old_balance AS oldBalance, new_balance AS newBalance 
      FROM transactions
      JOIN accounts ON accounts.account_number = transactions.account_number 
      WHERE accounts.client_id = $1 AND transactions.account_number = $2;`;
    const values = [req.user.id, accountNumber];
    const response = db.query(queryText, values);
    return response;
  }

  /**
  * @method getOne
  * @description Fetches a specific transaction
  * @param {object} req - The request object
  * @returns {object} JSON API Response
  */
  getOne(req) {
    const queryText = `
      SELECT transactions.id AS transactionId, transactions.createdon AS createdOn,
      transactions.type, transactions.account_number AS accountNumber, amount,
      old_balance AS oldBalance, new_balance AS newBalance 
      FROM transactions
      JOIN accounts ON accounts.account_number = transactions.account_number 
      WHERE transactions.id = $1 AND accounts.client_id = $2`;
    const values = [req.params.id, req.user.id];
    const response = db.query(queryText, values);
    return response;
  }

  /**
  * @method findInTransactions
  * @description Checks if there has been any transaction on an account
  * @param {object} accountNumber - The account number
  * @returns {object} JSON API Response
  */
  findInTransactions(accountNumber) {
    const queryText = 'SELECT account_number FROM transactions WHERE account_number = $1';
    const response = db.query(queryText, [accountNumber]);
    return response;
  }
}

const transaction = new Transaction();
export default transaction;
