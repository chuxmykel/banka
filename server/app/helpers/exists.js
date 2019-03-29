import users from '../models/users';
import accounts from '../models/accounts';

/**
 * @class Exists
 * @description Contains methods to check if an entity exists in the data structure
 * @exports exists
 */
class Exists {
  /**
  * @method emailExists
  * @description Verifies if the user email exists
  * @param {*} email - The email to be verified
  * @param {*} returnUser - A boolean value specifying if the user object should be returned
  * @returns {object} the user details and a boolean value indicating weather the email exist or not
  */
  emailExists(email, returnUser) {
    let emailExists = false;
    let userDetails;
    users.forEach((user) => {
      if (user.email === email) {
        userDetails = user;
        emailExists = true;
      }
    });
    if (returnUser) {
      return { userDetails, emailExists };
    }
    return emailExists;
  }

  /**
  * @method accountExists
  * @description Verifies if the user account exists
  * @param {*} accountNumber - The accountNumber to be verified
  * @param {*} returnAccount - A boolean value specifying if the account object should be returned
  * @returns {object} the account details, index and a boolean value
  * indicating weather the account exists or not
  * @returns {object} the account object
  */
  accountExists(accountNumber, returnAccount) {
    let accountExists = false;
    let accountDetails;
    let accountIndex;
    accounts.forEach((account) => {
      if (account.accountNumber === accountNumber) {
        accountDetails = account;
        accountExists = true;
        accountIndex = accounts.indexOf(account);
      }
    });
    if (returnAccount) {
      return { accountDetails, accountExists, accountIndex };
    }
    return accountExists;
  }
}

const exists = new Exists();

export default exists;
