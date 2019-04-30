import transactions from '../models/transactions';
import accounts from '../models/accounts';
import users from '../models/users';
import emailHandler from '../helpers/emailHandler';

/**
 * @class TransactionController
 * @description Contains controller methods for each transaction related endpoint
 * @exports TransactionController
 */
class TransactionController {
  /**
  * @method creditAccount
  * @description Credits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async creditAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const accountResponse = await accounts.find(accountNumber);
    if (accountResponse.rowCount < 1) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Account does not exist',
      });
    }
    const accountDetails = { ...accountResponse.rows[0] };
    if (accountDetails.status === 'draft') {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Transaction failed: Account is yet to be activated',
      });
    }
    const response = await transactions.create(req, accountDetails, 'credit');
    const transaction = response.rows[0];
    accounts.updateBalance(accountNumber, transaction.newBalance);
    emailHandler.notify(TransactionController.generateMail(transaction, accountDetails));

    return res.status(200).json({
      status: res.statusCode,
      data: [{
        transactionId: transaction.id,
        accountNumber: transaction.accountNumber,
        amount: parseFloat(transaction.amount),
        cashier: transaction.cashier,
        transactionType: transaction.type,
        oldBalance: accountDetails.balance,
        accountBalance: transaction.newBalance,
      }],
    });
  }

  /**
  * @method debitAccount
  * @description Debits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async debitAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const accountResponse = await accounts.find(accountNumber);
    if (accountResponse.rowCount < 1) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Account does not exist',
      });
    }
    const accountDetails = { ...accountResponse.rows[0] };
    if (accountDetails.status === 'draft') {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Transaction failed: Account is yet to be activated',
      });
    }
    if (req.body.amount > accountDetails.balance) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'insufficient funds',
      });
    }
    const response = await transactions.create(req, accountDetails, 'debit');
    const transaction = response.rows[0];
    accounts.updateBalance(accountNumber, transaction.newBalance);
    emailHandler.notify(TransactionController.generateMail(transaction, accountDetails));

    return res.status(200).json({
      status: res.statusCode,
      data: [{
        transactionId: transaction.id,
        accountNumber: transaction.accountNumber,
        amount: parseFloat(transaction.amount),
        cashier: transaction.cashier,
        transactionType: transaction.type,
        oldBalance: accountDetails.balance,
        accountBalance: transaction.newBalance,
      }],
    });
  }

  /**
  * @method getOne
  * @description fetches a specific transaction
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async getOne(req, res) {
    const { rows } = await transactions.getOne(req);

    if (!rows[0]) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'transaction not found',
      });
    }

    return res.status(200).json({
      status: res.statusCode,
      data: rows,
    });
  }

  /**
  * @method generateMail
  * @description Generates the mail message to be sent to the user
  * @param {object} transaction - The transaction Object
  * @param {object} accountDetails The account details
  * @returns {object} the message object
  */
  static async generateMail(transaction, accountDetails) {
    const { rows } = await users.findById(accountDetails.owner);
    const subject = `BeNS Transaction Alert [${transaction.type}:${transaction.type === 'debit' ? '-' : ''}${transaction.amount}]`;
    const body = `<p>
                Dear <em style="text-transform: capitalize">${rows[0].firstName} ${rows[0].lastName}</em>, <br>
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
    return { subject, body, email: rows[0].email };
  }
}

export default TransactionController;
