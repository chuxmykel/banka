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
    const transaction = transactions.create(req, res, 'credit');

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
    const transaction = transactions.create(req, res, 'debit');

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
