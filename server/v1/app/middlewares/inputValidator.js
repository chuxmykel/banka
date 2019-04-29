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
  static validateUser(req, res, next) {
    const user = { ...req.body };
    const validate = Schema.createUserSchema(user);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
    return next();
  }

  /**
    * @method validateUser
    * @description Validates the user object passed in from the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - The next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  static validateSuperUser(req, res, next) {
    const user = { ...req.body };
    const validate = Schema.superUserSchema(user);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
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
  static validateLogin(req, res, next) {
    const login = { ...req.body };
    const validate = Schema.loginSchema(login);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
    return next();
  }

  /**
  * @method validateAccount
  * @description Validates the login details passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  static validateAccount(req, res, next) {
    const type = { ...req.body };
    const validate = Schema.createAccountSchema(type);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
    return next();
  }

  /**
  * @method validateStatus
  * @description Validates the account status passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  static validateStatus(req, res, next) {
    const type = { ...req.body };
    const validate = Schema.editAccountSchema(type);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
    return next();
  }

  /**
  * @method validateAmount
  * @description Validates the amount passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  static validateAmount(req, res, next) {
    const amount = { ...req.body };
    const validate = Schema.transactionSchema(amount);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
    return next();
  }
}

export default InputValidator;
