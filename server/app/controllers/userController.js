import users from '../models/users';
import Auth from '../auth/auth';
import Exists from '../helpers/exists';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
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
    const id = users.length + 1;
    const type = 'client';
    const hashedPassword = Auth.hashPassword(userInput.password);

    if (Exists.emailExists(userInput.email, false)) {
      return res.status(422).json({
        status: 422,
        error: 'email is already taken',
      });
    }

    const user = {
      id,
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      email: userInput.email,
      type,
      password: hashedPassword,
    };

    const token = Auth.generateToken({ email: user.email, type });

    users.push(user);
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

    if (!emailExists) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed',
      });
    }

    if (!Auth.verifyPassword(login.password, userDetails.password)) {
      return res.status(401).send({
        status: 401,
        error: 'Authentication Failed',
      });
    }

    req.user = {
      id: userDetails.id,
      firstname: userDetails.firstName,
      lastname: userDetails.lastName,
      email: userDetails.email,
    };

    const token = Auth.generateToken(req.user);

    return res.status(200).send({
      status: 200,
      data: {
        token,
        id: req.user.id,
        firstName: req.user.firstname,
        lastName: req.user.lastname,
        email: req.user.email,
      },
    });
  }
}

const userController = new UserController();

export default userController;