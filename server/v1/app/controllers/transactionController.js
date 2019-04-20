import transactions from '../models/transactions';
// import emailHandler from '../helpers/emailHandler';
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
      accounts.updateBalance(accountNumber, transaction.new_balance);

      return res.status(201).json({
        status: res.statusCode,
        data: [{
          transactionId: transaction.id,
          accountNumber: transaction.account_number,
          amount: transaction.amount,
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.new_balance,
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
      accounts.updateBalance(accountNumber, transaction.new_balance);

      return res.status(201).json({
        status: res.statusCode,
        data: [{
          transactionId: transaction.id,
          accountNumber: transaction.account_number,
          amount: transaction.amount,
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.new_balance,
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

  // /**
  // * @method generateMail
  // * @description Generates the mail message to be sent to the user
  // * @param {object} transaction - The transaction Object
  // * @returns {object} the message object
  // */
  // static generateMail(transaction) {
  //   const userId = accounts.find(item => item.accountNumber === transaction.accountNumber).id;
  //   const user = users.find(item => item.id === userId);
  //   const subject = `BeNS Transaction Alert [${transaction.type}:${transaction
  //  .type === 'debit' ? '-' : ''}${transaction.amount}]`;
  //   const body = `<p>
  //                 Dear <em>${user.firstName} ${user.lastName}</em>, <br>
  //               BANKA electronic Notification Service (BeNS) ${transaction.type} alert notice<br>
  //                 A transaction just occured in your account with the details below
  //                 <table style="border: 1px solid">
  //                   <tr>
  //                     <td style="border: 1px solid">Account Number</td>
  //                     <td style="border: 1px solid">${transaction.accountNumber}</td>
  //                   </tr>
  //                   <tr>
  //                     <td style="border: 1px solid">Transaction Time</td>
  //                     <td style="border: 1px solid">${transaction.createdOn}</td>
  //                   </tr>
  //                   <tr>
  //                     <td style="border: 1px solid">Amount</td>
  //                     <td style="border: 1px solid">${transaction.amount}</td>
  //                   </tr>
  //                   <tr>
  //                     <td style="border: 1px solid">Balance</td>
  //                     <td style="border: 1px solid">${transaction.newBalance}</td>
  //                   </tr>
  //                 </table>
  //               </p>`;
  //   return { subject, body, email: user.email };
  // }
}

const transactionController = new TransactionController();

export default transactionController;
