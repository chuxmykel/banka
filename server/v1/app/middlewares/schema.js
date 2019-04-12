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
      firstName: Joi.string().min(5).max(12).required()
        .regex(/^[a-zA-Z]+$/),
      lastName: Joi.string().min(5).max(12).required()
        .regex(/^[a-zA-Z]+$/),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(5).max(30).required(),
    };
    return Joi.validate(user, schema);
  }

  /**
  * @method loginSchema
  * @description Validates the login details from a post request
  * @param {object} login - The login object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  loginSchema(login) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(8).max(30).required(),
    };
    return Joi.validate(login, schema);
  }

  /**
  * @method createAccountSchema
  * @description Validates the account details from a post request
  * @param {object} account - The account object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  createAccountSchema(account) {
    const schema = {
      type: Joi.string().length(7).required()
        .regex(/^savings$|^current$/),
      initialDeposit: Joi.number().greater(5000).required(),
    };
    return Joi.validate(account, schema);
  }

  /**
  * @method editAccountSchema
  * @description Validates the account status from a post request
  * @param {object} account - The account object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  editAccountSchema(account) {
    const schema = {
      status: Joi.string().min(6).max(7).required()
        .regex(/^active$|^dormant$/),
    };
    return Joi.validate(account, schema);
  }

  /**
  * @method transactionSchema
  * @description Validates the amount from a post request
  * @param {object} amount - The figure to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  transactionSchema(amount) {
    const schema = {
      amount: Joi.number().greater(999).required(),
    };
    return Joi.validate(amount, schema);
  }
}

const schema = new Schema();

export default schema;
