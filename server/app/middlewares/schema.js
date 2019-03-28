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
        .regex(/^[a-zA-Z]+$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'firstName cannot be empty!';
                break;
              case 'string.min':
                err.message = 'firstName must be at least 5 characters long';
                break;
              case 'string.max':
                err.message = 'firstName cannot be greater than 12 characters';
                break;
              case 'string.regex.base':
                err.message = 'firstName must start with and can only contain letters';
                break;
              case 'any.required':
                err.message = 'firstName is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      lastName: Joi.string().min(5).max(12).required()
        .regex(/^[a-zA-Z]+$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'lastName cannot be empty!';
                break;
              case 'string.min':
                err.message = 'lastName must be at least 5 characters long';
                break;
              case 'string.max':
                err.message = 'lastName cannot be greater than 12 characters';
                break;
              case 'string.regex.base':
                err.message = 'lastName must start with and can only contain letters';
                break;
              case 'any.required':
                err.message = 'lastName is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      email: Joi.string().email({ minDomainAtoms: 2 }).required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'email cannot be empty!';
                break;
              case 'string.email':
                err.message = 'Please provide a valid email address';
                break;
              case 'any.required':
                err.message = 'email is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string().min(5).max(30).required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'password cannot be empty!';
                break;
              case 'string.min':
              case 'string.max':
                err.message = 'Your password should be between 8 and 30 characters';
                break;
              case 'any.required':
                err.message = 'password is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
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
      email: Joi.string().email({ minDomainAtoms: 2 }).required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'email cannot be empty!';
                break;
              case 'string.email':
                err.message = 'Please provide a valid email address';
                break;
              case 'any.required':
                err.message = 'email is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string().min(8).max(30).required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'password cannot be empty!';
                break;
              case 'string.min':
              case 'string.max':
                err.message = 'Your password should be between 8 and 30 characters';
                break;
              case 'any.required':
                err.message = 'password is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
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
        .regex(/^savings$|^current$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'type cannot be empty!';
                break;
              case 'string.length':
              case 'string.regex.base':
                err.message = 'Account \'type\' can only be \'savings\' or \'current\'';
                break;
              case 'any.required':
                err.message = 'type is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      initialDeposit: Joi.number().greater(5000).required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'initialDeposit cannot be empty!';
                break;
              case 'number.greater':
                err.message = 'Your initialDeposit must be greater than NGN 5000';
                break;
              case 'any.required':
                err.message = 'initialDeposit is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
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
        .regex(/^active$|^dormant$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'status cannot be empty!';
                break;
              case 'string.min':
              case 'string.max':
              case 'string.regex.base':
                err.message = 'Account \'status\' can only be \'active\' or \'dormant\'';
                break;
              case 'any.required':
                err.message = 'status is required';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    };
    return Joi.validate(account, schema);
  }
}

const schema = new Schema();

export default schema;
