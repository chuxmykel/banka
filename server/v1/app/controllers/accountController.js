import accounts from '../models/accounts';
import transactions from '../models/transactions';

/**
 * @class AccountController
 * @description Contains controller methods for each account related endpoint
 * @exports accountController
 */
class AccountController {
  /**
  * @method createAccount
  * @description Adds a user's bank account to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async createAccount(req, res) {
    try {
      const { rows } = await accounts.create(req.body, req);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          accountNumber: rows[0].account_number,
          firstName: req.user.firstname,
          lastName: req.user.lastname,
          email: req.user.email,
          type: rows[0].type,
          openingBalance: rows[0].balance,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method changeAccountStatus
  * @description Activates or deactivates a bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async changeAccountStatus(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const response = await accounts.updateStatus(accountNumber, req.body.status);
      if (response.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }

      const account = response.rows[0];
      return res.status(200).json({
        status: res.statusCode,
        data: [{
          accountNumber: account.account_number,
          status: account.status,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method deleteAccount
  * @description Deletes an account from the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async deleteAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const response = await accounts.delete(accountNumber);
      if (response.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'Account successfully deleted',
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method getHistory
  * @description Fetches the transaction history for an account Number
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async getHistory(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const transaction = await transactions.findInTransactions(accountNumber);
      if (transaction.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account Number ${accountNumber} either does not exist or has no transaction history`,
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
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method getAccountDetails
  * @description Fetches a specific account details
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async getAccountDetails(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const response = await accounts.find(accountNumber);
      if (response.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account Number ${accountNumber} does not exist!`,
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
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method getUserAccounts
  * @description Fetches all accounts owned by a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async getUserAccounts(req, res) {
    try {
      const { rows } = await accounts.getAllForUser(req.params.email);

      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: `No account record found for the account with email ${req.params.email}`,
        });
      }

      return res.status(200).json({
        status: res.statusCode,
        accounts: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method getAllAccounts
  * @description Fetches all accounts from the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async getAllAccounts(req, res) {
    try {
      if (req.query.status) {
        const acceptedQuery = 'active' || 'dormant' || 'draft';
        const { rows } = await accounts.getByStatus(req.query.status);
        if (!acceptedQuery) {
          return res.status(400).json({
            status: res.statusCode,
            error: 'Accepted query parameters are \'active\', \'dormant\' or \'draft\'',
          });
        }
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
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }
}

const accountController = new AccountController();

export default accountController;
