/**
 * @class AccountNumber
 * @description a class with a method to generate an account number
 * @exports AccountNumber
 */
class AccountNumber {
  /**
  * @method generateAccountNumber
  * @description generates a pseudorandom account number
  * @returns {integer} the generated account number
  */
  static generateAccountNumber() {
    let numberString = '';

    while (numberString.length < 10) {
      numberString += Math.floor(Math.random() * 10);
    }
    return parseInt(numberString, 10);
  }
}

export default AccountNumber;
