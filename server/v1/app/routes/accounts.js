import express from 'express';
import AccountController from '../controllers/accountController';
import InputValidator from '../middlewares/inputValidator';
import AuthenticateUser from '../middlewares/authenticateUser';
import ParamValidator from '../middlewares/paramValidator';

const accountRoutes = express.Router();

accountRoutes.post('/',
  InputValidator.validateAccount,
  AuthenticateUser.verifyUser,
  AccountController.createAccount);

accountRoutes.patch('/:accountNumber',
  ParamValidator.validateAccNumber,
  InputValidator.validateStatus,
  AuthenticateUser.verifyStaff,
  AccountController.changeAccountStatus);

accountRoutes.delete('/:accountNumber',
  ParamValidator.validateAccNumber,
  AuthenticateUser.verifyStaff,
  AccountController.deleteAccount);

accountRoutes.get('/:accountNumber/transactions',
  ParamValidator.validateAccNumber,
  AuthenticateUser.verifyUser,
  AccountController.getHistory);

accountRoutes.get('/:accountNumber',
  ParamValidator.validateAccNumber,
  AuthenticateUser.verifyUser,
  AccountController.getAccountDetails);

accountRoutes.get('/',
  ParamValidator.validateQueryParams,
  AuthenticateUser.verifyStaff,
  AccountController.getAllAccounts);

export default accountRoutes;
