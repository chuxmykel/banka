import users from '../models/accounts';

/**
 * @class AccountNumber
 * @description Contains methods to generate random account numbers
 * @exports accountNumber
 */
class AccountNumber {
  /**
  * @method generateAccountNumber
  * @description generates a pseudorandom account number
  * @param {integer} id - The id of the account
  * @param {integer} ownerId - The owner id
  * @param {string} type - A that is either savings or current
  * @returns {integer} the generated account number
  */
  generateAccountNumber(id, ownerId, type) {
    const typeToNo = type === 'savings' ? '00' : '000';
    let numberString = `${id}${typeToNo}${ownerId}`;

    while (numberString.length < 10) {
      numberString += Math.floor(Math.random() * 10);
    }
    return parseInt(numberString, 10);
  }
}

const accountNumber = new AccountNumber();

export default accountNumber;
