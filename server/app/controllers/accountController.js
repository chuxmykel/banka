import accounts from '../models/accounts';
import AccountNumber from '../helpers/accountNumber';
import Exists from '../helpers/exists';

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
  createAccount(req, res) {
    const { type, initialDeposit } = req.body;
    const id = accounts[accounts.length - 1].id + 1;
    const owner = req.user.id;
    const accountNumber = AccountNumber.generateAccountNumber(id, owner, type);

    const account = {
      id,
      accountNumber,
      createdOn: new Date(),
      owner,
      type,
      status: 'draft',
      balance: initialDeposit,
    };

    accounts.push(account);
    return res.status(201).json({
      status: res.statusCode,
      data: {
        accountNumber: account.accountNumber,
        firstName: req.user.firstname,
        lastName: req.user.lastname,
        email: req.user.email,
        type: account.type,
        openingBalance: account.balance,
      },
    });
  }

  /**
  * @method changeAccountStatus
  * @description Activates or deactivates a bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  changeAccountStatus(req, res) {
    const { status } = req.body;

    const {
      accountDetails,
      accountExists,
    } = Exists.accountExists(parseInt(req.params.accountNumber, 10), true);

    if (!accountExists) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account with account number ${req.params.accountNumber} does not exist`,
      });
    }

    accountDetails.status = status;

    return res.status(200).json({
      status: res.statusCode,
      data: {
        accountNumber: accountDetails.accountNumber,
        status: accountDetails.status,
      },
    });
  }

  /**
  * @method deleteAccount
  * @description Deletes an account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  deleteAccount(req, res) {
    const {
      accountExists,
      accountIndex,
    } = Exists.accountExists(parseInt(req.params.accountNumber, 10), true);

    if (!accountExists) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account with account number ${req.params.accountNumber} does not exist`,
      });
    }

    accounts.splice(accountIndex, 1);
    return res.status(200).send({
      status: res.statusCode,
      message: 'Account successfully deleted',
    });
  }
}

const accountController = new AccountController();

export default accountController;
