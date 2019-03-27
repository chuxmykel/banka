import Schema from './schema';

/**
 * @class InputValidator
 * @description Validates all user inputs
 * @exports InputValidator
 */
class InputValidator {
  /**
    * @method validateUser
    * @description Validates the user object passed in from the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - The next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  validateUser(req, res, next) {
    const user = { ...req.body };
    const validate = Schema.createUserSchema(user);
    const { error } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details[0].message,
      });
    }
    return next();
  }

  /**
  * @method validateLogin
  * @description Validates the login details passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  validateLogin(req, res, next) {
    const login = { ...req.body };
    const validate = Schema.loginSchema(login);
    const { error } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details[0].message,
      });
    }
    return next();
  }
}

const inputValidator = new InputValidator();

export default inputValidator;