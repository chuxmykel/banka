import accounts from '../models/accounts';

/**
 * @class AccountController
 * @description Contains controller methods for each account related endpoint
 * @exports accountController
 */
class AccountController {
  /**
  * @method createAccount
  * @description Adds a user's bank account to the data structure
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
  * @description Deletes an account from the data structure
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  deleteAccount(req, res) {
    const { accountExists, accountIndex } = accounts
      .getOne(parseInt(req.params.accountNumber, 10));

    if (accountExists === false) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account with account number ${req.params.accountNumber} does not exist`,
      });
    }
    accounts.delete(accountIndex);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Account successfully deleted',
    });
  }
}

const accountController = new AccountController();

export default accountController;
