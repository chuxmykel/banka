import express from 'express';
import AccountController from '../controllers/accountController';
import InputValidator from '../middlewares/inputValidator';
import AuthenticateUser from '../middlewares/authenticateUser';

const accountRoutes = express.Router();

accountRoutes.post('/',
  InputValidator.validateAccount,
  AuthenticateUser.verifyUser,
  AccountController.createAccount);

accountRoutes.patch('/:accountNumber',
  InputValidator.validateStatus,
  AuthenticateUser.verifyAdmin,
  AccountController.changeAccountStatus);

accountRoutes.delete('/:accountNumber',
  AuthenticateUser.verifyAdmin,
  AccountController.deleteAccount);

accountRoutes.get('/:accountNumber/transactions',
  AuthenticateUser.verifyUser,
  AccountController.getHistory);

accountRoutes.get('/:accountNumber',
  AuthenticateUser.verifyUser,
  AccountController.getAccountDetails);

export default accountRoutes;
