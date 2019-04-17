import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

/**
 * @class Auth
 * @description Contains methods for each user related endpoint
 * @exports auth
 */
class Auth {
  /**
  * @method hashPassword
  * @description Hashes the user inputed password
  * @param {string} password - The user password to be hashed
  * @returns {string} A string of the hashed password
  */
  hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
  }

  /**
  * @method verifyPassword
  * @description Verifies if the user password is valid by comparing
  * it against the stored hashed password
  * @param {string} plainTextPassword - The plain text password to be verified
  * @param {string} hashedPassword - Stored hashed password to compare against
  * @returns {boolean} Booelean indicating success or failure
  */
  verifyPassword(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }

  /**
  * @method generateToken
  * @description Generates a token for the user
  * @param {string} payload - The user payload for generating the token
  * @returns {string} A string which is the token
  */
  generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
  }

  /**
  * @method verifyToken
  * @description verifies the given token
  * @param {string} token - The token to be verified
  * @returns {object} The payload of the token
  */
  verifyToken(token) {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  }
}

const auth = new Auth();

export default auth;
