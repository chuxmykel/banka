import Auth from '../auth/auth';

/**
 * @class AuthenticateUser
 * @description Contains methods for user authentication
 * @exports auth
 */
class AuthenticateUser {
  /**
   * @method verifyUser
   * @description verifies the user token
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next Object
   * @returns {object} JSON API Response
   */
  verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Auth.verifyToken(token);

      req.user = decoded;

      return next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'Authentication Failed',
      });
    }
  }
}

const authenticateUser = new AuthenticateUser();

export default authenticateUser;