import accounts from './accounts';
import transactions from './data/transactions';

/**
 * @exports transaction
 * @class Transaction
 */
class Transaction {
/**
  * @method create
  * @description Creates a new transaction object and adds it to the data structure
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {string} type - A string representing the type of transaction
  * @returns {object} JSON API Response
  */
  create(req, res, type) {
    const { accountDetails } = accounts
      .getOne(parseInt(req.params.accountNumber, 10), res);

    const transaction = {
      id: transactions.length + 1,
      createdOn: new Date(),
      type,
      accountNumber: parseInt(req.params.accountNumber, 10),
      cashier: req.user.id,
      amount: parseFloat(req.body.amount),
      oldBalance: accountDetails.balance,
      newBalance: type === 'credit' ? parseFloat((accountDetails
        .balance + parseFloat(req.body.amount))
        .toFixed(2)) : parseFloat((accountDetails
        .balance - parseFloat(req.body.amount)).toFixed(2)),
    };

    accountDetails.balance = transaction.newBalance;
    transactions.push(transaction);
    return transaction;
  }
}

const transaction = new Transaction();
export default transaction;
