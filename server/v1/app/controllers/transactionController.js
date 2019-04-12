import transactions from '../models/transactions';

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
  creditAccount(req, res) {
    const transaction = transactions.create(req, 'credit');
    if (!transaction) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'sorry, the account number does not exist',
      });
    }
    return res.status(201).json({
      status: res.statusCode,
      data: {
        transactionId: transaction.id,
        accountNumber: transaction.accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: transaction.newBalance,
      },
    });
  }

  /**
  * @method debitAccount
  * @description Debits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  debitAccount(req, res) {
    // add a try catch block to make sure you can't debit more than you have
    const transaction = transactions.create(req, 'debit');
    if (!transaction) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'sorry, the account number does not exist',
      });
    }
    if (transaction === 'insufficient funds') {
      return res.status(400).json({
        status: res.statusCode,
        error: transaction,
      });
    }
    return res.status(201).json({
      status: res.statusCode,
      data: {
        transactionId: transaction.id,
        accountNumber: transaction.accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: transaction.newBalance,
      },
    });
  }
}

const transactionController = new TransactionController();

export default transactionController;
