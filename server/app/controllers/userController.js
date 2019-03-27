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

    if (Exists.emailExists(userInput.email)) {
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
}

const userController = new UserController();

export default userController;
