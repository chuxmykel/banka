import Auth from '../auth/auth';
import users from './data/users';

/**
 * @exports
 * @class User
 */
class User {
  /**
   * @param {*} data
   * @param {*} res
   * @returns { object } user object
   */
  create(data) {
    const user = {
      id: users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      type: 'client',
      password: Auth.hashPassword(data.password),
    };

    users.push(user);
    return user;
  }

  /**
   * @param {*} data
   * @returns { object } user object
   */
  login(data) {
    const user = {
      id: data.id,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
    };
    if (data.type !== 'client') {
      user.isAdmin = data.isAdmin;
      user.type = data.type;
    }
    return user;
  }
}

export default new User();