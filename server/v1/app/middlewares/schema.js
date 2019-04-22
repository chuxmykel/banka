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
  createUserSchema(user) {
    const schema = {
      firstName: Joi.string().trim().required()
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
      lastName: Joi.string().trim().required()
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
  loginSchema(login) {
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
  createAccountSchema(account) {
    const schema = {
      type: Joi.string().trim().lowercase().valid('savings', 'current')
        .required(),
      initialDeposit: Joi.number().greater(5000).required(),
    };
    return Joi.validate(account, schema, { abortEarly: false });
  }

  /**
  * @method editAccountSchema
  * @description Validates the account status from a patch request
  * @param {object} account - The account object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  editAccountSchema(account) {
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
  transactionSchema(amount) {
    const schema = {
      amount: Joi.number().required(),
    };
    return Joi.validate(amount, schema, { abortEarly: false });
  }
}

const schema = new Schema();

export default schema;
