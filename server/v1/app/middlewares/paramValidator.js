import Schema from './schema';

/**
 * @class ParamValidator
 * @description Validates all request paramaters
 * @exports paramValidator
 */
class ParamValidator {
  /**
    * @method validateAccNumber
    * @description Validates account numbers passed in through the request parameter
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - The next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  validateAccNumber(req, res, next) {
    const { accountNumber } = req.params;
    const validate = Schema.accountSchema(accountNumber);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.params = value;
    return next();
  }

  /**
    * @method validateIdParams
    * @description Validates IDs passed in through the request parameter
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - The next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  validateIdParams(req, res, next) {
    const { id } = req.params;
    const validate = Schema.idSchema(id);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.params = value;
    return next();
  }

  /**
    * @method validateEmailParams
    * @description Validates emails passed in through the request parameter
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - The next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  validateEmailParams(req, res, next) {
    const { email } = req.params;
    const validate = Schema.emailSchema(email);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.params = value;
    return next();
  }

  /**
    * @method validateQueryParams
    * @description Validates query parameters passed in through the request
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - The next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  validateQueryParams(req, res, next) {
    const validate = Schema.querySchema(req.query);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details.map(detail => detail.message),
      });
    }
    req.query = value;
    return next();
  }
}

const paramValidator = new ParamValidator();

export default paramValidator;
