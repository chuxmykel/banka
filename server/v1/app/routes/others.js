import express from 'express';
import AccountController from '../controllers/accountController';
import AuthenticateUser from '../middlewares/authenticateUser';
import ParamValidator from '../middlewares/paramValidator';

const otherRoutes = express.Router();

otherRoutes.get('/:email/accounts',
  ParamValidator.validateEmailParams,
  AuthenticateUser.verifyStaff,
  AccountController.getUserAccounts);

otherRoutes.get('/accounts',
  AuthenticateUser.verifyUser,
  AccountController.getUserAccounts);

export default otherRoutes;
