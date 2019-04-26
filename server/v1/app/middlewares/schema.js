import Joi from 'joi';

/**
 * @class Schema
 * @description Validates user input.
 * @exports Schema
 */
class Schema {
  /**
  * @method createUserSchema
  * @description Validates the user object from a post request
  * @param {object} user - The user object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static createUserSchema(user) {
    const schema = {
      firstName: Joi.string().lowercase().trim().required()
        .regex(/^[a-zA-Z]+$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'firstName can only contain letters';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      lastName: Joi.string().lowercase().trim().required()
        .regex(/^[a-zA-Z]+$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'lastName can only contain letters';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      email: Joi.string().trim().lowercase().email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string().min(5).required(),
    };
    return Joi.validate(user, schema, { abortEarly: false });
  }

  /**
  * @method loginSchema
  * @description Validates the login details from a post request
  * @param {object} login - The login object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static loginSchema(login) {
    const schema = {
      email: Joi.string().trim().lowercase().email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string().min(5).required(),
    };
    return Joi.validate(login, schema, { abortEarly: false });
  }

  /**
  * @method createAccountSchema
  * @description Validates the account details from a post request
  * @param {object} account - The account object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static createAccountSchema(account) {
    const schema = {
      type: Joi.string().trim().lowercase().valid('savings', 'current', 'loan')
        .required(),
      initialDeposit: Joi.number().min(5000).required(),
    };
    return Joi.validate(account, schema, { abortEarly: false });
  }

  /**
  * @method editAccountSchema
  * @description Validates the account status from a patch request
  * @param {object} account - The account object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static editAccountSchema(account) {
    const schema = {
      status: Joi.string().trim().lowercase().valid('active', 'dormant')
        .required(),
    };
    return Joi.validate(account, schema, { abortEarly: false });
  }

  /**
  * @method transactionSchema
  * @description Validates the amount from a post request
  * @param {object} amount - The figure to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static transactionSchema(amount) {
    const schema = {
      amount: Joi.number().positive().required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'number.positive':
                err.message = 'Invalid amount';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    };
    return Joi.validate(amount, schema, { abortEarly: false });
  }

  /**
  * @method accountSchema
  * @description Validates account numbers from the req.params object
  * @param {integer} accountNumber - The account number to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static accountSchema(accountNumber) {
    const schema = {
      accountNumber: Joi.string().required()
        .regex(/^[0-9]{10}$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'Invalid account number, please provide a valid account number (10 digit integer)';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    };
    const value = {
      accountNumber,
    };
    return Joi.validate(value, schema, { abortEarly: false });
  }


  /**
  * @method idSchema
  * @description Validates ids from the req.params object
  * @param {integer} id - The id to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static idSchema(id) {
    const schema = {
      id: Joi.string().required()
        .regex(/^[1-9][0-9]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'Invalid ID, please provide a valid id (digit from 1 and above)';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    };
    const value = {
      id,
    };
    return Joi.validate(value, schema, { abortEarly: false });
  }

  /**
  * @method emailSchema
  * @description Validates email addresses from the req.params object
  * @param {string} email - The email to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static emailSchema(email) {
    const schema = {
      email: Joi.string().trim().lowercase().email({ minDomainAtoms: 2 })
        .required(),
    };
    const value = {
      email,
    };
    return Joi.validate(value, schema, { abortEarly: false });
  }

  /**
  * @method querySchema
  * @description the query from the req.query object
  * @param {string} query - The query object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static querySchema(query) {
    const schema = {
      status: Joi.string().trim().lowercase().valid('active', 'dormant', 'draft'),
    };
    return Joi.validate(query, schema, { abortEarly: true });
  }
}

export default Schema;
