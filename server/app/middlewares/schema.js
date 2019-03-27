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
      firstName: Joi.string().min(2).max(12).required()
        .regex(/^[a-zA-Z]+$/),
      lastName: Joi.string().min(2).max(12).required()
        .regex(/^[a-zA-Z]+$/),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(5).max(30).required(),
    };
    return Joi.validate(user, schema);
  }
}

const schema = new Schema();

export default schema;
