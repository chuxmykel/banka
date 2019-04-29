import accounts from '../models/accounts';
import transactions from '../models/transactions';

/**
 * @class AccountController
 * @description Contains controller methods for each account related endpoint
 * @exports AccountController
 */
class AccountController {
  /**
  * @method createAccount
  * @description Adds a user's bank account to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async createAccount(req, res) {
    const { rows } = await accounts.create(req.body, req);
    return res.status(201).json({
      status: res.statusCode,
      data: [{
        accountNumber: rows[0].accountNumber,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        type: rows[0].type,
        openingBalance: rows[0].balance,
      }],
    });
  }

  /**
  * @method changeAccountStatus
  * @description Activates or deactivates a bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async changeAccountStatus(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const findAccount = await accounts.find(accountNumber);
    if (findAccount.rowCount < 1) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Account does not exist',
      });
    }
    const accountDetails = findAccount.rows[0];
    if (accountDetails.status === 'draft' && req.body.status === 'dormant') {
      return res.status(400).json({
        status: res.statusCode,
        error: 'You can\'t deactivate a draft account',
      });
    }
    const response = await accounts.updateStatus(accountNumber, req.body.status);
    const account = response.rows[0];
    return res.status(200).json({
      status: res.statusCode,
      data: [{
        accountNumber,
        status: account.status,
      }],
    });
  }

  /**
  * @method deleteAccount
  * @description Deletes an account from the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async deleteAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const response = await accounts.delete(accountNumber);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Account does not exist',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'Account successfully deleted',
    });
  }

  /**
  * @method getHistory
  * @description Fetches the transaction history for an account Number
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async getHistory(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const account = await accounts.find(accountNumber);
    if (account.rowCount < 1) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Account does not exist',
      });
    }
    const transaction = await transactions.findInTransactions(accountNumber);
    if (transaction.rowCount < 1) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'No transaction records for this account number',
      });
    }

    const response = await transactions.getAllHistory(req, accountNumber);
    if (response.rowCount < 1) {
      return res.status(403).json({
        status: res.statusCode,
        error: 'You are not authorized to view the transaction history of this account',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: response.rows,
    });
  }

  /**
  * @method getAccountDetails
  * @description Fetches a specific account details
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async getAccountDetails(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const response = await accounts.find(accountNumber);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Account does not exist!',
      });
    }
    const { rows } = await accounts.getOne(accountNumber);
    if (rows[0].owner !== req.user.id) {
      return res.status(403).json({
        status: res.statusCode,
        error: 'You are not authorized to view this account\'s details',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: rows,
    });
  }

  /**
  * @method getUserAccounts
  * @description Fetches all accounts owned by a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async getUserAccounts(req, res) {
    const { rows } = await accounts.getAllForUser(req.params.email);

    if (!rows[0]) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'No account record found',
      });
    }

    return res.status(200).json({
      status: res.statusCode,
      accounts: rows,
    });
  }

  /**
  * @method getAllAccounts
  * @description Fetches all accounts from the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async getAllAccounts(req, res) {
    if (req.query.status) {
      const { rows } = await accounts.getByStatus(req.query.status);
      return res.status(200).json({
        status: res.statusCode,
        data: rows,
      });
    }
    const { rows } = await accounts.getAll();
    return res.status(200).json({
      status: res.statusCode,
      data: rows,
    });
  }
}

export default AccountController;
