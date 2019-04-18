import users from '../models/users';
import Auth from '../auth/auth';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports userController
 */
class UserController {
  /**
  * @method signUp
  * @description Adds a user to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async signUp(req, res) {
    try {
      const response = await users.create(req.body);
      const user = response.rows[0];
      const token = Auth.generateToken({ id: user.id, email: user.email });
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          token,
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        }],
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(422).json({
          status: res.statusCode,
          error: 'email is already taken',
        });
      }
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method signIn
  * @description Logs in a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async signIn(req, res) {
    const { email, password } = req.body;
    const response = await users.find(email);

    if (response.rowCount < 1 || !Auth.verifyPassword(password, response.rows[0].password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed',
      });
    }
    const user = { ...response.rows[0] };
    const token = Auth.generateToken(user);

    return res.status(200).json({
      status: 200,
      data: [{
        token,
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      }],
    });
  }
}

const userController = new UserController();

export default userController;
