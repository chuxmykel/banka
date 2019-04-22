import transactions from '../models/transactions';
import accounts from '../models/accounts';

/**
 * @class TransactionController
 * @description Contains controller methods for each transaction related endpoint
 * @exports transactionController
 */
class TransactionController {
  /**
  * @method creditAccount
  * @description Credits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async creditAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const accountResponse = await accounts.find(accountNumber);
      if (accountResponse.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }
      const accountDetails = { ...accountResponse.rows[0] };
      const response = await transactions.create(req, accountDetails, 'credit');
      const transaction = response.rows[0];
      accounts.updateBalance(accountNumber, transaction.newBalance);

      return res.status(201).json({
        status: res.statusCode,
        data: [{
          transactionId: transaction.id,
          accountNumber: transaction.accountNumber,
          amount: parseFloat(transaction.amount),
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.newBalance,
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
  * @method debitAccount
  * @description Debits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async debitAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const accountResponse = await accounts.find(accountNumber);
      if (accountResponse.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }
      const accountDetails = { ...accountResponse.rows[0] };
      const response = await transactions.create(req, accountDetails, 'debit');
      const transaction = response.rows[0];
      accounts.updateBalance(accountNumber, transaction.newBalance);

      return res.status(201).json({
        status: res.statusCode,
        data: [{
          transactionId: transaction.id,
          accountNumber: transaction.accountNumber,
          amount: parseFloat(transaction.amount),
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.newBalance,
        }],
      });
    } catch (error) {
      if (error.code === '23514') {
        return res.status(409).json({
          status: res.statusCode,
          error: 'insufficient funds',
        });
      }
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method getOne
  * @description fetches a specific transaction
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async getOne(req, res) {
    try {
      const { rows } = await transactions.getOne(req);

      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: `transaction with id ${req.params.id} not found`,
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
}

const transactionController = new TransactionController();

export default transactionController;
