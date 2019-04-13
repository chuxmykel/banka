import transactions from '../models/transactions';
import emailHandler from '../helpers/emailHandler';
import users from '../models/data/users';
import accounts from '../models/data/accounts';

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
    emailHandler.notify(TransactionController.generateMail(transaction));
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
    emailHandler.notify(TransactionController.generateMail(transaction));
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
  * @method generateMail
  * @description Generates the mail message to be sent to the user
  * @param {object} transaction - The transaction Object
  * @returns {object} the message object
  */
  static generateMail(transaction) {
    const userId = accounts.find(item => item.accountNumber === transaction.accountNumber).id;
    const user = users.find(item => item.id === userId);
    const subject = `BeNS Transaction Alert [${transaction.type}:${transaction.type === 'debit' ? '-' : ''}${transaction.amount}]`;
    const body = `<p>
                  Dear <em>${user.firstName} ${user.lastName}</em>, <br>
                  BANKA electronic Notification Service (BeNS) ${transaction.type} alert notice<br>
                  A transaction just occured in your account with the details below
                  <table style="border: 1px solid">
                    <tr>
                      <td style="border: 1px solid">Account Number</td>
                      <td style="border: 1px solid">${transaction.accountNumber}</td> 
                    </tr>
                    <tr>
                      <td style="border: 1px solid">Transaction Time</td>
                      <td style="border: 1px solid">${transaction.createdOn}</td> 
                    </tr>
                    <tr>
                      <td style="border: 1px solid">Amount</td>
                      <td style="border: 1px solid">${transaction.amount}</td> 
                    </tr>
                    <tr>
                      <td style="border: 1px solid">Balance</td>
                      <td style="border: 1px solid">${transaction.newBalance}</td> 
                    </tr>
                  </table>
                </p>`;
    return { subject, body, email: user.email };
  }
}

const transactionController = new TransactionController();

export default transactionController;
