import Auth from '../auth/auth';
import db from '../migrations/db';

/**
 * @exports User
 * @class User
 */
class User {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  static create(data) {
    const queryText = `INSERT INTO users ("firstName", "lastName", email,
      password) VALUES ($1, $2, $3, $4) RETURNING id, "firstName", "lastName", email;`;

    const {
      firstName, lastName, email, password,
    } = data;

    const hashedPassword = Auth.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword];
    const response = db.query(queryText, values);
    return response;
  }

  /**
   * @param {*} email
   * @returns { object } user object
   */
  static find(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const response = db.query(query, [email]);
    return response;
  }
}

export default User;
