import nodemailer from 'nodemailer';
import debug from 'debug';
import dotenv from 'dotenv';

dotenv.config();
const log = debug('dev');

/**
 * @class EmailHandler
 * @description Handles all the mailing needs of the app
 * @exports EmailHandler
 */
class EmailHandler {
  /**
  * @method notify
  * @description sends an email notification to the specified email
  * @param {object} message - The email address, subject & body
  * @returns {*} nothing
  */
  static async notify(message) {
    const response = await message;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SERVER_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SERVER_MAIL,
      to: response.email,
      subject: response.subject,
      html: response.body,
    };

    transporter.sendMail(mailOptions, (err, info) => (err ? log(err) : log(info)));
  }
}

export default EmailHandler;
