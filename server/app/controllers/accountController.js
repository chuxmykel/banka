import accounts from '../models/accounts';
import AccountNumber from '../helpers/accountNumber';

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
    const id = accounts.length + 1;
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
}

const accountController = new AccountController();

export default accountController;