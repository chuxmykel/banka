import express from 'express';
import AccountController from '../controllers/accountController';
import AuthenticateUser from '../middlewares/authenticateUser';

const otherRoutes = express.Router();

otherRoutes.get('/:email/accounts',
  AuthenticateUser.verifyAdmin,
  AccountController.getUserAccounts);


export default otherRoutes;
