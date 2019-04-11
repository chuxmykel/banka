import users from '../models/data/users';

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
}

const exists = new Exists();

export default exists;
