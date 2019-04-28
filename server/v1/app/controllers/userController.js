import jwt from 'jsonwebtoken';
import users from '../models/users';
import Auth from '../auth/auth';
import emailHandler from '../helpers/emailHandler';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
 */
class UserController {
  /**
  * @method signUp
  * @description Adds a user to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async signUp(req, res) {
    const findUser = await users.find(req.body.email);
    if (findUser.rowCount > 0) {
      return res.status(422).json({
        status: res.statusCode,
        error: 'email is already taken',
      });
    }
    const response = await users.create(req.body);
    const user = response.rows[0];
    const token = Auth.generateToken({ id: user.id, email: user.email });
    return res.status(201).json({
      status: res.statusCode,
      data: [{
        token,
        ...user,
      }],
    });
  }

  /**
  * @method signIn
  * @description Logs in a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async signIn(req, res) {
    const { email, password } = req.body;
    const response = await users.find(email);

    if (response.rowCount < 1 || !Auth.verifyPassword(password, response.rows[0].password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'The email and password you entered did not match our records. Please double-check and try again.',
      });
    }
    const {
      id, firstName, lastName, type, isAdmin,
    } = response.rows[0];
    const token = Auth.generateToken({
      id, email, firstName, lastName, type, isAdmin,
    });

    return res.status(200).json({
      status: 200,
      data: [{
        token,
        id,
        firstName,
        lastName,
        email,
      }],
    });
  }

  /**
  * @method sendResetMail
  * @description Resets the user's password
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async sendResetMail(req, res) {
    const { email } = req.body;
    const response = await users.find(email);
    if (response.rowCount < 1) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'The email you entered did not match our records. Please double-check and try again.',
      });
    }
    const payload = { id: response.rows[0].id, email };
    const secret = response.rows[0].password;
    const token = Auth.getOneTimeToken(payload, secret);
    const link = `<a href="https://a-bank.herokuapp.com/api/v1/auth/passwordreset/${payload.id}/${token}">Reset password</a>`;
    emailHandler.notify(UserController.generateLinkMail(response.rows[0], link));
    return res.status(200).json({
      status: res.statusCode,
      message: 'A password reset link has been sent to your email',
    });
  }

  /**
  * @method passwordReset
  * @description Sends a password reset form to the user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async passwordReset(req, res) {
    const { id, token } = req.params;
    const response = await users.findById(id);
    if (response.rowCount < 1) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Invalid password reset link',
      });
    }
    const payload = jwt.verify(token, response.rows[0].password, (err, decoded) => {
      if (err) {
        return res.status(400).send({
          status: res.statusCode,
          error: 'Invalid password reset link',
        });
      }
      return decoded;
    });

    emailHandler.notify(UserController.generateResetMail(payload, token));
    return res.status(200).json({
      status: res.statusCode,
      message: 'Kindly check your email to reset your password',
    });
  }

  /**
      * @method resetPassword
      * @description Resets the user's password
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
    */
  static async resetPassword(req, res) {
    const { id, token, password } = req.body;
    const response = await users.findById(id);
    if (response.rowCount < 1) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Invalid password reset link',
      });
    }
    jwt.verify(token, response.rows[0].password, (err) => {
      if (err) {
        return res.status(400).send({
          status: res.statusCode,
          error: 'Invalid password reset link',
        });
      }
    });

    users.updatePassword(password, id);
    return res.status(201).json({
      status: res.statusCode,
      message: 'Password reset successfully',
    });
  }

  /**
  * @method generateMail
  * @description Generates the password reset message to be sent to the user
  * @param {object} user - The user whose pasword will be reset
  * @param {object} link The password reset link
  * @returns {object} the message object
  */
  static async generateLinkMail(user, link) {
    const subject = 'Password Reset';
    const body = `
    <p>
      Hi <em style="text-transform: capitalize">${user.firstName}</em> <br>
      You recently requested to reset the password for your Banka account. 
      Please click the link below to reset it. <br>
      ${link} <br>
      If you did not request a password reset, please ignore this email or reply to let us know.
      The link is only valid for the next 30mins. <br>
      Thanks,<br>
      Chux and the Banka Team
    </p>`;
    return { subject, body, email: user.email };
  }

  /**
  * @method generateResetMail
  * @description Generates the password reset form
  * @param {object} payload
  * @param {object} token
  * @returns {object} the message object
  */
  static async generateResetMail(payload, token) {
    const subject = 'Password Reset';
    const body = `
    <h1>Password Reset Form</h1>
    <p>Enter a new password</p>
    <form action="https://a-bank.herokuapp.com/api/v1/auth/resetpassword" method="POST">
      <input type="hidden" name="id" value="${payload.id}" />
      <input type="hidden" name="token" value="${token}" />
      <input type="password" name="password" value="" placeholder="Enter your new password..."/>
      <input type="submit" value="Reset Password"/>
    </form>`;
    return { subject, body, email: payload.email };
  }
}

export default UserController;
