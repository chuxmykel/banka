import moment from 'moment';
import accounts from './data/accounts';
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
  * @method getOne
  * @description returns the account details if it the account number exists
  * @param {*} accountNumber - The accountNumber
  * @returns {object} the account details
  */
  getOne(accountNumber) {
    let accountExists = false;
    let accountDetails;
    let accountIndex;
    accounts.forEach((account) => {
      if (account.accountNumber === accountNumber) {
        accountExists = true;
        accountDetails = account;
        accountIndex = accounts.indexOf(account);
      }
    });
    return { accountDetails, accountExists, accountIndex };
  }

  /**
  * @method delete
  * @description Deletes an account
  * @param {object} index - The Response Object
  * @returns {object} JSON API Response
  */
  delete(index) {
    accounts.splice(index, 1);
  }
}

const account = new Account();
export default account;
