import users from '../models/users';

/**
 * @class Exists
 * @description Contains methods to check if an entity exists in the data structure
 * @exports exists
 */
class Exists {
  /**
  * @method emailExists
  * @description Verifies if the user email already exists
  * @param {*} email - The email to be verified
  * @returns {boolean} a boolean value indicating weather the email exist or not
  */
  emailExists(email) {
    let emailExists;
    users.forEach((user) => {
      if (user.email === email) {
        emailExists = true;
      }
    });
    return emailExists;
  }
}

const exists = new Exists();

export default exists;
