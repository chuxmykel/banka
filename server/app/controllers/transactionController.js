import transactions from '../models/transactions';
import Exists from '../helpers/exists';

/**
 * @class TransactionController
 * @description Contains controller methods for each transaction related endpoint
 * @exports transactionController
 */
class TransactionController {
  /**
  * @method creditAccount
  * @description Adds credit's a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  creditAccount(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;

    const {
      accountDetails,
      accountExists,
    } = Exists.accountExists(parseInt(accountNumber, 10), true);

    if (!accountExists) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account with account number ${accountNumber} does not exist`,
      });
    }

    const transaction = {
      id: transactions.length + 1,
      createdOn: new Date(),
      type: 'credit',
      accountNumber: parseInt(accountNumber, 10),
      cashier: req.user.id,
      amount: parseFloat(amount),
      oldBalance: accountDetails.balance,
      newBalance: parseFloat((accountDetails.balance + parseFloat(amount)).toFixed(2)),
    };

    accountDetails.balance = transaction.newBalance;
    transactions.push(transaction);

    return res.status(201).json({
      status: res.statusCode,
      data: {
        transactionId: transaction.id,
        accountNumber,
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
