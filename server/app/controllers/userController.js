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
      return res.status(401).json({
        status: 401,
        error: 'Authentication Failed',
      });
    }

    const user = {
      id: userDetails.id,
      firstname: userDetails.firstName,
      lastname: userDetails.lastName,
      email: userDetails.email,
    };

    if (userDetails.type !== 'client') {
      user.isAdmin = userDetails.isAdmin;
      user.type = userDetails.type;
    }

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
