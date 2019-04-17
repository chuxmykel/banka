import Auth from '../auth/auth';
import db from '../migrations/db';

/**
 * @exports
 * @class User
 */
class User {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  create(data) {
    const queryText = `INSERT INTO users (firstname, lastname, email,
      password) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email;`;

    const {
      firstName, lastName, email, password,
    } = data;

    const hashedPassword = Auth.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword];
    const response = db.query(queryText, values);
    return response;
  }

  /**
   * @param {*} data
   * @returns { object } user object
   */
  login(data) {
    const user = {
      id: data.id,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
    };
    if (data.type !== 'client') {
      user.isAdmin = data.isAdmin;
      user.type = data.type;
    }
    return user;
  }
}

export default new User();
