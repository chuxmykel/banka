/**
 * @class AccountNumber
 * @description Contains methods to generate random account numbers
 * @exports accountNumber
 */
class AccountNumber {
  /**
  * @method generateAccountNumber
  * @description generates a pseudorandom account number
  * @returns {integer} the generated account number
  */
  generateAccountNumber() {
    let numberString = '';

    while (numberString.length < 10) {
      numberString += Math.floor(Math.random() * 10);
    }
    return parseInt(numberString, 10);
  }
}

const accountNumber = new AccountNumber();

export default accountNumber;
