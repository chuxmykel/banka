import express from 'express';
import TransactionController from '../controllers/transactionController';
import InputValidator from '../middlewares/inputValidator';
import AuthenticateUser from '../middlewares/authenticateUser';

const transactionRoutes = express.Router();

transactionRoutes.post('/:accountNumber/credit',
  InputValidator.validateAmount,
  AuthenticateUser.verifyStaff,
  TransactionController.creditAccount);

transactionRoutes.post('/:accountNumber/debit',
  InputValidator.validateAmount,
  AuthenticateUser.verifyStaff,
  TransactionController.debitAccount);

export default transactionRoutes;
