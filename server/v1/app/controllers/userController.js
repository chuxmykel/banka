import users from '../models/users';
import Auth from '../auth/auth';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
 */
class UserController {
  /**
  * @method signUp
  * @description Adds a user to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async signUp(req, res) {
    try {
      const response = await users.create(req.body);
      const user = response.rows[0];
      const token = Auth.generateToken({ id: user.id, email: user.email });
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          token,
          ...user,
        }],
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(422).json({
          status: res.statusCode,
          error: 'email is already taken',
        });
      }
    }
  }

  /**
  * @method signIn
  * @description Logs in a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async signIn(req, res) {
    const { email, password } = req.body;
    const response = await users.find(email);

    if (response.rowCount < 1 || !Auth.verifyPassword(password, response.rows[0].password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed',
      });
    }
    const {
      id, firstName, lastName, type, isAdmin,
    } = response.rows[0];
    const token = Auth.generateToken({
      id, email, firstName, lastName, type, isAdmin,
    });

    return res.status(200).json({
      status: 200,
      data: [{
        token,
        id,
        firstName,
        lastName,
        email,
      }],
    });
  }
}

export default UserController;
