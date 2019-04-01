import users from '../models/users';
import Auth from '../auth/auth';
import Exists from '../helpers/exists';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports userController
 */
class UserController {
  /**
  * @method signUp
  * @description Adds a user to the data structure
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  signUp(req, res) {
    const userInput = { ...req.body };

    if (Exists.emailExists(userInput.email, false)) {
      return res.status(422).json({
        status: 422,
        error: 'email is already taken',
      });
    }

    const user = users.create(userInput);

    const token = Auth.generateToken({ email: user.email, type: user.type });

    return res.status(201).json({
      status: res.statusCode,
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }

  /**
  * @method signIn
  * @description Logs in a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  signIn(req, res) {
    const login = { ...req.body };
    const { userDetails, emailExists } = Exists.emailExists(login.email, true);

    if (!emailExists || !Auth.verifyPassword(login.password, userDetails.password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed',
      });
    }

    const user = users.login(userDetails);
    const token = Auth.generateToken(user);

    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      },
    });
  }
}

const userController = new UserController();

export default userController;
