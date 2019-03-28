import express from 'express';
import AccountController from '../controllers/accountController';
import InputValidator from '../middlewares/inputValidator';
import AuthenticateUser from '../middlewares/authenticateUser';

const accountRoutes = express.Router();

accountRoutes.post('/',
  InputValidator.validateAccount,
  AuthenticateUser.verifyUser,
  AccountController.createAccount);

export default accountRoutes;
